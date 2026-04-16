require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Geocode ZIP to lat/lng
async function getCoordsFromZip(zip) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}, USA&key=${GOOGLE_API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status !== 'OK') {
    throw new Error(`Geocoding failed: ${response.data.status}`);
  }
  const location = response.data.results[0].geometry.location;
  return { lat: location.lat, lng: location.lng };
}

// Haversine distance in miles
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Map Google Places types to readable categories
function getDisplayCategory(types) {
  if (!types || !types.length) return "Misc";

  const categoryMap = {
    // Food Assistance
    'food': 'Food Assistance',
    'restaurant': 'Food Assistance',
    'cafe': 'Food Assistance',
    'bakery': 'Food Assistance',
    'grocery_or_supermarket': 'Food Assistance',
    'meal_takeaway': 'Food Assistance',
    'meal_delivery': 'Food Assistance',
    'food_bank': 'Food Assistance',
    // Healthcare
    'hospital': 'Healthcare',
    'doctor': 'Healthcare',
    'health': 'Healthcare',
    'pharmacy': 'Healthcare',
    'physiotherapist': 'Healthcare',
    'dentist': 'Healthcare',
    'clinic': 'Healthcare',
    'mental_health': 'Healthcare',
    'wellness': 'Healthcare',
    // Housing
    'shelter': 'Housing',
    'homeless_shelter': 'Housing',
    'lodging': 'Housing',
    'hostel': 'Housing',
    'real_estate_agency': 'Housing',
    'rental': 'Housing',
    // Emergencies
    'police': 'Emergencies',
    'fire_station': 'Emergencies',
    'hospital_emergency': 'Emergencies',
    // Seniors
    'senior_center': 'Seniors',
    'assisted_living': 'Seniors',
    'home_care': 'Seniors',
    'caregiver': 'Seniors',
    // Disabilities
    'disability': 'Disabilities',
    'accessibility': 'Disabilities',
    // Financial Help
    'bank': 'Financial Help',
    'finance': 'Financial Help',
    'atm': 'Financial Help',
    'accounting': 'Financial Help',
    'notary': 'Financial Help',
    // Transportation
    'bus_station': 'Transportation',
    'transit_station': 'Transportation',
    'taxi_stand': 'Transportation',
    'bicycle_rental': 'Transportation',
    // Youth
    'school': 'Youth',
    'university': 'Youth',
    'library': 'Youth',
    'child_care': 'Youth',
    'day_care': 'Youth',
    'summer_camp': 'Youth',
    // Legal Services
    'lawyer': 'Legal Services',
    'legal': 'Legal Services',
    'attorney': 'Legal Services',
    // Crisis
    'mental_health': 'Crisis',
    'domestic_violence': 'Crisis',
    'substance_abuse': 'Crisis',
    // Digital Resources
    'library': 'Digital',
    'internet_cafe': 'Digital',
    'community_centre': 'Digital'
  };

  for (const type of types) {
    if (categoryMap[type]) {
      return categoryMap[type];
    }
  }
  return "Misc";
}

app.get('/api/resources', async (req, res) => {
  let { zip, category, radius = 10 } = req.query;
  if (!zip || !category) {
    return res.status(400).json({ error: 'Missing zip or category' });
  }

  try {
    const { lat, lng } = await getCoordsFromZip(zip);
    const maxDistanceMiles = parseFloat(radius);
    const searchRadiusMeters = maxDistanceMiles * 1609.34;

    // Helper to perform a search with a given query string
    const searchPlaces = async (query) => {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${lat},${lng}&radius=${searchRadiusMeters}&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(url);
      return response.data.results || [];
    };

    // Initial search with the provided category keyword
    let places = await searchPlaces(category);

    // FALLBACK: If we got fewer than 5 results, try a very broad query
    if (places.length < 5) {
      console.log(`Low results (${places.length}) for "${category}" – using broad fallback query.`);
      const fallbackKeyword = "community center OR social services OR nonprofit";
      const fallbackPlaces = await searchPlaces(fallbackKeyword);
      if (fallbackPlaces.length > places.length) {
        places = fallbackPlaces;
      }
    }

    const resources = [];

    for (const place of places) {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=formatted_phone_number,website,opening_hours,formatted_address,geometry&key=${GOOGLE_API_KEY}`;
      const detailsRes = await axios.get(detailsUrl);
      const details = detailsRes.data.result;

      const distance = calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng);

      // Strict radius filter
      if (distance > maxDistanceMiles) {
        continue;
      }

      let hoursString = 'Hours not available';
      if (details.opening_hours && details.opening_hours.weekday_text) {
        hoursString = details.opening_hours.weekday_text.join(', ');
      }

      const displayCategory = getDisplayCategory(place.types);

      resources.push({
        id: place.place_id,
        name: place.name,
        address: details.formatted_address || place.formatted_address || 'Address not available',
        category: displayCategory,
        hours: hoursString,
        fees: 'Call for information',
        distance: Math.round(distance * 10) / 10,
        website: details.website || '',
        phone: details.formatted_phone_number || '',
        description: place.types ? place.types.join(', ') : 'Community resource',
        coordinates: place.geometry.location,
      });
    }

    resources.sort((a, b) => a.distance - b.distance);
    res.json({ resources });
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));