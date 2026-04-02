require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

app.get('/api/resources', async (req, res) => {
  const { zip, category, radius = 10 } = req.query;
  if (!zip || !category) {
    return res.status(400).json({ error: 'Missing zip or category' });
  }

  try {
    // Use Google Places Text Search: "category in zip"
    const query = `${category} in ${zip}`;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);

    // Format the response to match what your frontend expects
    const resources = response.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      // You can add more fields later by calling Place Details API
    }));

    res.json({ resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});