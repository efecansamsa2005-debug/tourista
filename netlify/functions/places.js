const https = require('https');

const GOOGLE_API_KEY = 'AIzaSyDO7obcIDXDAw-ga891GIwUFRB_oc9OT-c';

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
    
    const requestBody = JSON.stringify({
      textQuery: `${query} in ${city}`,
      maxResultCount: 6,
      languageCode: 'en'
    });

    const data = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'places.googleapis.com',
        path: '/v1/places:searchText',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.photos,places.regularOpeningHours,places.editorialSummary',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(JSON.parse(body)));
      });
      req.on('error', reject);
      req.write(requestBody);
      req.end();
    });

    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
