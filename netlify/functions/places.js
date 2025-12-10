const https = require('https');

const GEOAPIFY_API_KEY = '7d1d2774885c48ba96e369672ae53462';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { query, city } = JSON.parse(event.body);
    
    // First get city coordinates
    const geoData = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.geoapify.com',
        path: `/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${GEOAPIFY_API_KEY}`,
        method: 'GET'
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(JSON.parse(body)));
      });
      req.on('error', reject);
      req.end();
    });

    if (!geoData.features || geoData.features.length === 0) {
      return { statusCode: 200, headers, body: JSON.stringify({ results: [] }) };
    }

    const [lon, lat] = geoData.features[0].geometry.coordinates;

    // Search for places
    const categoryMap = {
      'restaurant': 'catering.restaurant',
      'coffee': 'catering.cafe',
      'cafe': 'catering.cafe',
      'bar': 'catering.bar',
      'pub': 'catering.pub',
      'club': 'entertainment.nightclub',
      'nightclub': 'entertainment.nightclub',
      'museum': 'entertainment.museum',
      'park': 'leisure.park',
      'hotel': 'accommodation.hotel',
      'shop': 'commercial.shopping_mall',
      'market': 'commercial.marketplace',
      'bakery': 'catering.fast_food.bakery',
      'dessert': 'catering.ice_cream',
      'landmark': 'tourism.attraction',
      'historic': 'tourism.sights',
      'viewpoint': 'tourism.attraction',
      'default': 'tourism,catering,entertainment'
    };

    let category = categoryMap['default'];
    const queryLower = query.toLowerCase();
    for (const [key, value] of Object.entries(categoryMap)) {
      if (queryLower.includes(key)) {
        category = value;
        break;
      }
    }

    const placesData = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.geoapify.com',
        path: `/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&limit=10&apiKey=${GEOAPIFY_API_KEY}`,
        method: 'GET'
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(JSON.parse(body)));
      });
      req.on('error', reject);
      req.end();
    });

    const results = (placesData.features || []).map(place => ({
      id: place.properties.place_id,
      name: place.properties.name || 'Unknown Place',
      address: place.properties.formatted || place.properties.street || '',
      lat: place.properties.lat,
      lon: place.properties.lon,
      category: place.properties.categories?.[0] || '',
      city: place.properties.city || city
    }));

    return { statusCode: 200, headers, body: JSON.stringify({ results }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};