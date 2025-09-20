'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation, Star } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  priceLevel?: number;
  vicinity: string;
  placeId: string;
  types: string[];
  photos?: unknown[];
  openingHours?: {
    openNow: boolean;
    weekdayText: string[];
  };
  formattedPhoneNumber?: string;
}

interface GooglePlaceNew {
  id?: string;
  place_id?: string;
  displayName?: { text: string };
  name?: string;
  rating?: number;
  priceLevel?: number;
  price_level?: number;
  formattedAddress?: string;
  vicinity?: string;
  types?: string[];
  photos?: unknown[];
}

const restaurantTypes = [
  { key: 'steakhouse', label: 'Steakhouse', icon: '🥩' },
  { key: 'brazilian', label: 'Brazilian BBQ', icon: '🇧🇷' },
  { key: 'korean', label: 'Korean BBQ', icon: '🇰🇷' },
  { key: 'argentine', label: 'Argentine Grill', icon: '🇦🇷' },
  { key: 'american', label: 'American BBQ', icon: '🇺🇸' },
];

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have a Google Maps API key
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      console.log('API Key found:', !!apiKey);
      console.log('API Key value:', apiKey ? 'Present' : 'Missing');
      
      if (!apiKey || apiKey === 'your_api_key_here' || apiKey.length < 20) {
        console.log('Using mock data - no valid API key provided');
        // Use mock data if no API key
        setRestaurants(getMockRestaurants());
        setLoading(false);
        return;
      }

      // Use Google Places API
      const restaurants = await searchNearbyRestaurants(parseFloat(lat!), parseFloat(lng!), apiKey);
      setRestaurants(restaurants);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants. Using sample data instead.');
      // Fallback to mock data
      setRestaurants(getMockRestaurants());
    } finally {
      setLoading(false);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (!lat || !lng) {
      router.push('/');
      return;
    }

    fetchRestaurants();
  }, [lat, lng, router, fetchRestaurants]);

  const searchNearbyRestaurants = async (latitude: number, longitude: number, _apiKey: string): Promise<Restaurant[]> => {
    const searchTerms = ['steakhouse', 'brazilian bbq', 'korean bbq', 'argentine grill', 'american bbq'];
    const allRestaurants: Restaurant[] = [];

    for (const term of searchTerms) {
      try {
        // Use our server-side API route to call Places (New) API
        console.log('Making request to Places (New) API via server route');
        const response = await fetch('/api/places', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            textQuery: term,
            latitude: latitude,
            longitude: longitude
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Google Places (New) API response:', data);
        
        if (data.places && data.places.length > 0) {
          const restaurants = data.places.map((place: GooglePlaceNew) => ({
            id: place.id || place.place_id,
            name: place.displayName?.text || place.name,
            rating: place.rating || 0,
            priceLevel: place.priceLevel || place.price_level,
            vicinity: place.formattedAddress || place.vicinity,
            placeId: place.id || place.place_id,
            types: place.types || [],
            photos: place.photos || [],
          }));
          
          allRestaurants.push(...restaurants);
        } else if (data.error) {
          console.error('Google Places (New) API error:', data.error);
          throw new Error(`API error: ${data.error.message || 'Unknown error'}`);
        } else {
          console.warn('No places found for term:', term);
        }
      } catch (err) {
        console.error(`Error searching for ${term}:`, err);
        // If it's a network error or API error, we'll fall back to mock data
        throw err;
      }
    }

    // Remove duplicates and sort by rating
    const uniqueRestaurants = allRestaurants.filter((restaurant, index, self) => 
      index === self.findIndex(r => r.placeId === restaurant.placeId)
    );

    return uniqueRestaurants.sort((a, b) => b.rating - a.rating);
  };

  const getMockRestaurants = (): Restaurant[] => [
    {
      id: '1',
      name: 'Prime Steakhouse',
      rating: 4.8,
      priceLevel: 4,
      vicinity: '123 Main St, Downtown',
      placeId: 'mock1',
      types: ['restaurant', 'steakhouse'],
    },
    {
      id: '2',
      name: 'Fogo de Chão',
      rating: 4.6,
      priceLevel: 4,
      vicinity: '456 Oak Ave, Midtown',
      placeId: 'mock2',
      types: ['restaurant', 'brazilian'],
    },
    {
      id: '3',
      name: 'Gen Korean BBQ',
      rating: 4.4,
      priceLevel: 3,
      vicinity: '789 Pine St, Uptown',
      placeId: 'mock3',
      types: ['restaurant', 'korean'],
    },
    {
      id: '4',
      name: 'La Parilla Argentina',
      rating: 4.7,
      priceLevel: 3,
      vicinity: '321 Elm St, Eastside',
      placeId: 'mock4',
      types: ['restaurant', 'argentine'],
    },
    {
      id: '5',
      name: 'Franklin Barbecue',
      rating: 4.9,
      priceLevel: 3,
      vicinity: '900 E 11th St, East Austin',
      placeId: 'mock5',
      types: ['restaurant', 'american'],
    },
    {
      id: '6',
      name: 'Joe\'s Kansas City Bar-B-Que',
      rating: 4.5,
      priceLevel: 2,
      vicinity: '3002 W 47th Ave, Kansas City',
      placeId: 'mock6',
      types: ['restaurant', 'american'],
    },
  ];

  const getRestaurantType = (types: string[]): string => {
    if (types.some(type => type.includes('brazilian'))) return 'brazilian';
    if (types.some(type => type.includes('korean'))) return 'korean';
    if (types.some(type => type.includes('argentine'))) return 'argentine';
    if (types.some(type => type.includes('american'))) return 'american';
    return 'steakhouse';
  };

  const filteredRestaurants = selectedType === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => getRestaurantType(restaurant.types) === selectedType);

  const getDirectionsUrl = (placeId: string, name: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(name)}&destination_place_id=${placeId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Finding steakhouses near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-white hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-primary">SteakFinder Results</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedType === 'all' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedType('all')}
              >
                All Types
              </Badge>
              {restaurantTypes.map((type) => (
                <Badge
                  key={type.key}
                  variant={selectedType === type.key ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => setSelectedType(type.key)}
                >
                  {type.icon} {type.label}
                </Badge>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-muted-foreground">
              Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
            </p>

            {/* Restaurant Cards */}
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">{restaurant.name}</CardTitle>
                        <CardDescription className="text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {restaurant.vicinity}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{restaurant.rating}</span>
                        </div>
                        {restaurant.priceLevel && (
                          <div className="text-muted-foreground text-sm mt-1">
                            {'$'.repeat(restaurant.priceLevel)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">
                          {restaurantTypes.find(t => t.key === getRestaurantType(restaurant.types))?.icon} 
                          {' '}
                          {restaurantTypes.find(t => t.key === getRestaurantType(restaurant.types))?.label || 'Steakhouse'}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => window.open(getDirectionsUrl(restaurant.placeId, restaurant.name), '_blank')}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredRestaurants.length === 0 && (
                <Card className="bg-card border-border">
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No restaurants found for the selected filter.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedType('all')}
                      className="mt-4"
                    >
                      Show All Results
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {error && (
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="py-4">
                  <p className="text-destructive">{error}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing sample data for demonstration purposes.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Map View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Interactive map will be displayed here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Requires Google Maps API key
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
