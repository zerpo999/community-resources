require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Geocode ZIP to lat/lng (add ", USA" to improve accuracy)
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

app.get('/api/resources', async (req, res) => {
  const { zip, category, radius = 10 } = req.query;
  if (!zip || !category) {
    return res.status(400).json({ error: 'Missing zip or category' });
  }

  try {
    // 1. Get coordinates of the ZIP
    const { lat, lng } = await getCoordsFromZip(zip);

    // 2. Search for places using Text Search (with location bias)
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(category)}&location=${lat},${lng}&radius=${radius * 1609.34}&key=${GOOGLE_API_KEY}`;
    const searchRes = await axios.get(searchUrl);

    if (searchRes.data.status !== 'OK') {
      return res.json({ resources: [] });
    }

    const places = searchRes.data.results;
    const resources = [];

    // 3. For each place, fetch details and calculate distance
    for (const place of places) {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=formatted_phone_number,website,opening_hours,formatted_address,geometry&key=${GOOGLE_API_KEY}`;
      const detailsRes = await axios.get(detailsUrl);
      const details = detailsRes.data.result;

      const distance = calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng);

      let hoursString = 'Hours not available';
      if (details.opening_hours && details.opening_hours.weekday_text) {
        hoursString = details.opening_hours.weekday_text.join(', ');
      }

      resources.push({
        id: place.place_id,
        name: place.name,
        address: details.formatted_address || place.formatted_address || 'Address not available',
        category: category,
        hours: hoursString,
        fees: 'Call for information', // Google doesn't provide fees
        distance: Math.round(distance * 10) / 10,
        website: details.website || '',
        phone: details.formatted_phone_number || '',
        description: place.types ? place.types.join(', ') : 'Community resource',
        coordinates: place.geometry.location,
      });
    }

    res.json({ resources });
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));