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
    const { address } = await request.json();

    if (!address) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameter: address',
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
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('Google Maps API key not configured for geocoding');
      return new Response(
        JSON.stringify({ 
          error: 'Google Maps API key not configured for geocoding',
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

    // Use Google Geocoding API
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    const response = await fetch(geocodeUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return new Response(JSON.stringify({
        lat: location.lat,
        lng: location.lng,
        formatted_address: data.results[0].formatted_address,
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(
        JSON.stringify({ 
          error: 'Address not found',
          details: data.status,
        }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Error calling Google Geocoding API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to geocode address' }),
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

