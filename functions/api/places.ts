export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;

  // Enable CORS for all origins
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { textQuery, latitude, longitude } = await request.json();

    if (!textQuery || !latitude || !longitude) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameters: textQuery, latitude, longitude',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Use the secure secret (server-side only)
    const apiKey = env.GOOGLE_MAPS_API_KEY;
    
    // Debug logging
    console.log('Environment keys:', Object.keys(env));
    console.log('API Key found:', !!apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('Google Maps API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Google Maps API key not configured',
          debug: {
            envKeys: Object.keys(env),
            hasApiKey: !!apiKey,
            apiKeyLength: apiKey ? apiKey.length : 0
          }
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const googleUrl = `https://places.googleapis.com/v1/places:searchText?key=${apiKey}`;
    
    const requestBody = {
      textQuery,
      locationBias: {
        circle: {
          center: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
          radius: 5000,
        },
      },
    };

    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'places.displayName,places.id,places.rating,places.priceLevel,places.formattedAddress,places.types,places.photos,places.location,places.currentOpeningHours,places.websiteUri',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error calling Google Places API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch places data' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

