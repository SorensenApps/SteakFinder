import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { textQuery, latitude, longitude } = await request.json();

    if (!textQuery || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required parameters: textQuery, latitude, longitude' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    const googleUrl = `https://places.googleapis.com/v1/places:searchText?key=${apiKey}`;
    
    const requestBody = {
      textQuery,
      locationBias: {
        circle: {
          center: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          },
          radius: 5000
        }
      }
    };

    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'places.displayName,places.id,places.rating,places.priceLevel,places.formattedAddress,places.types,places.photos,places.location'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Google Places (New) API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places data' },
      { status: 500 }
    );
  }
}
