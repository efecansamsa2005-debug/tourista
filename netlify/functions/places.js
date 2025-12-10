const https = require('https');

const FOURSQUARE_API_KEY = '03BJB5LBWKHHQV3PAEJJ21NANUAE0MSBLICYD4VEU01AXZD5';

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
    const searchQuery = encodeURIComponent(`${query} ${city}`);
    const near = encodeURIComponent(city);

    const data = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.foursquare.com',
        path: `/v3/places/search?query=${searchQuery}&near=${near}&limit=10`,
        method: 'GET',
        headers: {
          'Authorization': FOURSQUARE_API_KEY,
          'Accept': 'application/json'
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve({ results: [] });
          }
        });
      });
      req.on('error', reject);
      req.end();
    });

    // Get photos for each place
    const placesWithPhotos = await Promise.all(
      (data.results || []).slice(0, 6).map(async (place) => {
        try {
          const photos = await new Promise((resolve, reject) => {
            const req = https.request({
              hostname: 'api.foursquare.com',
              path: `/v3/places/${place.fsq_id}/photos?limit=5`,
              method: 'GET',
              headers: {
                'Authorization': FOURSQUARE_API_KEY,
                'Accept': 'application/json'
              }
            }, (res) => {
              let body = '';
              res.on('data', chunk => body += chunk);
              res.on('end', () => {
                try {
                  resolve(JSON.parse(body));
                } catch (e) {
                  resolve([]);
                }
              });
            });
            req.on('error', () => resolve([]));
            req.end();
          });
          return { ...place, photos: photos || [] };
        } catch (e) {
          return { ...place, photos: [] };
        }
      })
    );

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ results: placesWithPhotos }) 
    };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};