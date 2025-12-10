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
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch(e) {
            resolve({ features: [] });
          }
        });
      });
      req.on('error', () => resolve({ features: [] }));
      req.end();
    });

    if (!geoData.features || geoData.features.length === 0) {
      return { statusCode: 200, headers, body: JSON.stringify({ places: [] }) };
    }

    const [lon, lat] = geoData.features[0].geometry.coordinates;

    // Map query to category
    const queryLower = query.toLowerCase();
    let category = 'tourism,catering,entertainment';
    
    if (queryLower.includes('restaurant') || queryLower.includes('food') || queryLower.includes('cuisine')) {
      category = 'catering.restaurant';
    } else if (queryLower.includes('coffee') || queryLower.includes('cafe')) {
      category = 'catering.cafe';
    } else if (queryLower.includes('bar') || queryLower.includes('pub')) {
      category = 'catering.bar,catering.pub';
    } else if (queryLower.includes('club') || queryLower.includes('night')) {
      category = 'entertainment.nightclub,entertainment.club';
    } else if (queryLower.includes('museum')) {
      category = 'entertainment.museum';
    } else if (queryLower.includes('park') || queryLower.includes('garden')) {
      category = 'leisure.park,natural';
    } else if (queryLower.includes('shop') || queryLower.includes('market') || queryLower.includes('mall')) {
      category = 'commercial';
    } else if (queryLower.includes('hotel') || queryLower.includes('hostel')) {
      category = 'accommodation';
    } else if (queryLower.includes('beach')) {
      category = 'beach';
    } else if (queryLower.includes('historic') || queryLower.includes('landmark') || queryLower.includes('monument')) {
      category = 'tourism.sights,tourism.attraction,building.historic';
    } else if (queryLower.includes('dessert') || queryLower.includes('bakery') || queryLower.includes('sweet')) {
      category = 'catering.fast_food.bakery,catering.ice_cream';
    } else if (queryLower.includes('street food')) {
      category = 'catering.fast_food';
    }

    // Search for places
    const placesData = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.geoapify.com',
        path: `/v2/places?categories=${category}&filter=circle:${lon},${lat},10000&limit=10&apiKey=${GEOAPIFY_API_KEY}`,
        method: 'GET'
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch(e) {
            resolve({ features: [] });
          }
        });
      });
      req.on('error', () => resolve({ features: [] }));
      req.end();
    });

    const places = (placesData.features || []).map(place => ({
      id: place.properties.place_id || Math.random().toString(36).substr(2, 9),
      name: place.properties.name || 'Unnamed Place',
      address: place.properties.formatted || place.properties.street || city,
      category: place.properties.categories ? place.properties.categories[0] : '',
      lat: place.properties.lat,
      lon: place.properties.lon
    }));

    return { statusCode: 200, headers, body: JSON.stringify({ places }) };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 200, headers, body: JSON.stringify({ places: [], error: error.message }) };
  }
};