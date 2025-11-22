'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation, Star, Check, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  priceLevel?: number;
  vicinity: string;
  placeId: string;
  types: string[];
  photos?: unknown[];
  lat?: number;
  lng?: number;
  distance?: number;
  useMiles?: boolean;
  openingHours?: {
    openNow: boolean;
    weekdayText: string[];
  };
  currentOpeningHours?: {
    openNow: boolean;
    weekdayText: string[];
  };
  websiteUri?: string;
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
  location?: {
    latitude: number;
    longitude: number;
  };
  lat?: number;
  lng?: number;
  currentOpeningHours?: {
    openNow: boolean;
    weekdayText: string[];
  };
  websiteUri?: string;
}

const restaurantTypes = [
  { key: 'steakhouse', label: 'Steakhouse', icon: '🥩' },
  { key: 'brazilian', label: 'Brazilian BBQ', icon: '🇧🇷' },
  { key: 'korean', label: 'Korean BBQ', icon: '🇰🇷' },
  { key: 'argentine', label: 'Argentine Grill', icon: '🇦🇷' },
  { key: 'american', label: 'American BBQ', icon: '🇺🇸' },
];

// Haversine formula to calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// Convert kilometers to miles
const kmToMiles = (km: number): number => {
  return km * 0.621371;
};

// Check if user is in a country that uses miles (US, UK, etc.)
const isMilesCountry = (latitude: number, longitude: number): boolean => {
  // US coordinates roughly: 24.396308 to 49.384358 lat, -125.000000 to -66.934570 lng
  // UK coordinates roughly: 49.959999 to 60.860000 lat, -8.180000 to 1.760000 lng
  const isUS = latitude >= 24.396308 && latitude <= 49.384358 && 
               longitude >= -125.000000 && longitude <= -66.934570;
  const isUK = latitude >= 49.959999 && latitude <= 60.860000 && 
               longitude >= -8.180000 && longitude <= 1.760000;
  
  return isUS || isUK;
};

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loadingProgress, setLoadingProgress] = useState<string>('Initializing search...');

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = `restaurants_${lat}_${lng}`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Cache valid for 10 minutes
        if (Date.now() - timestamp < 10 * 60 * 1000) {
          console.log('Using cached restaurant data');
          setLoadingProgress('Loading cached results...');
          setRestaurants(data);
          setLoading(false);
          return;
        }
      }

      setLoadingProgress('Finding restaurants nearby...');
      
      // Use Google Places API through secure server function
      const restaurants = await searchNearbyRestaurants(parseFloat(lat!), parseFloat(lng!));
      setLoadingProgress('Processing results...');
      setRestaurants(restaurants);
      
      // Cache the results
      localStorage.setItem(cacheKey, JSON.stringify({
        data: restaurants,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants. Please try again.');
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

  const searchNearbyRestaurants = async (latitude: number, longitude: number): Promise<Restaurant[]> => {
    const searchTerms = ['steakhouse', 'brazilian bbq', 'korean bbq', 'argentine grill', 'american bbq'];
    
    // Make all API calls in parallel instead of sequentially
    console.log('Making parallel requests to Places (New) API via server route');
    const apiCalls = searchTerms.map(async (term) => {
      try {
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
        console.log(`Google Places (New) API response for ${term}:`, data);
        
        if (data.places && data.places.length > 0) {
          return data.places.map((place: GooglePlaceNew) => ({
            id: place.id || place.place_id,
            name: place.displayName?.text || place.name,
            rating: place.rating || 0,
            priceLevel: place.priceLevel || place.price_level,
            vicinity: place.formattedAddress || place.vicinity,
            placeId: place.id || place.place_id,
            types: place.types || [],
            photos: place.photos || [],
            lat: place.location?.latitude || place.lat,
            lng: place.location?.longitude || place.lng,
            currentOpeningHours: place.currentOpeningHours,
            websiteUri: place.websiteUri,
          }));
        } else if (data.error) {
          console.error('Google Places (New) API error:', data.error);
          throw new Error(`API error: ${data.error.message || 'Unknown error'}`);
        } else {
          console.warn('No places found for term:', term);
          return [];
        }
      } catch (err) {
        console.error(`Error searching for ${term}:`, err);
        // Return empty array for failed searches instead of throwing
        return [];
      }
    });

    // Wait for all API calls to complete
    const results = await Promise.all(apiCalls);
    const allRestaurants = results.flat();

    // Remove duplicates
    const uniqueRestaurants = allRestaurants.filter((restaurant, index, self) => 
      index === self.findIndex(r => r.placeId === restaurant.placeId)
    );

    // Filter to only show restaurants that are currently open
    const openRestaurants = uniqueRestaurants.filter(restaurant => 
      restaurant.currentOpeningHours?.openNow === true
    );

    // Calculate distance and sort by distance, then limit to 10
    const useMiles = isMilesCountry(latitude, longitude);
    const restaurantsWithDistance = openRestaurants.map(restaurant => {
      if (restaurant.lat && restaurant.lng) {
        const distanceKm = calculateDistance(latitude, longitude, restaurant.lat, restaurant.lng);
        const distance = useMiles ? kmToMiles(distanceKm) : distanceKm;
        return { ...restaurant, distance, useMiles };
      }
      return { ...restaurant, distance: Infinity, useMiles };
    });

    return restaurantsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
  };

  const getMockRestaurants = (): Restaurant[] => {
    const userLat = parseFloat(lat!);
    const userLng = parseFloat(lng!);
    
    const mockData = [
      {
        id: '1',
        name: 'Prime Steakhouse',
        rating: 4.8,
        priceLevel: 4,
        vicinity: '123 Main St, Downtown',
        placeId: 'mock1',
        types: ['restaurant', 'steakhouse'],
        lat: userLat + 0.001,
        lng: userLng + 0.001,
      },
      {
        id: '2',
        name: 'Fogo de Chão',
        rating: 4.6,
        priceLevel: 4,
        vicinity: '456 Oak Ave, Midtown',
        placeId: 'mock2',
        types: ['restaurant', 'brazilian'],
        lat: userLat + 0.002,
        lng: userLng - 0.001,
      },
      {
        id: '3',
        name: 'Gen Korean BBQ',
        rating: 4.4,
        priceLevel: 3,
        vicinity: '789 Pine St, Uptown',
        placeId: 'mock3',
        types: ['restaurant', 'korean'],
        lat: userLat - 0.001,
        lng: userLng + 0.002,
      },
      {
        id: '4',
        name: 'La Parilla Argentina',
        rating: 4.7,
        priceLevel: 3,
        vicinity: '321 Elm St, Eastside',
        placeId: 'mock4',
        types: ['restaurant', 'argentine'],
        lat: userLat + 0.003,
        lng: userLng + 0.003,
      },
      {
        id: '5',
        name: 'Franklin Barbecue',
        rating: 4.9,
        priceLevel: 3,
        vicinity: '900 E 11th St, East Austin',
        placeId: 'mock5',
        types: ['restaurant', 'american'],
        lat: userLat - 0.002,
        lng: userLng - 0.002,
      },
      {
        id: '6',
        name: 'Joe\'s Kansas City Bar-B-Que',
        rating: 4.5,
        priceLevel: 2,
        vicinity: '3002 W 47th Ave, Kansas City',
        placeId: 'mock6',
        types: ['restaurant', 'american'],
        lat: userLat + 0.004,
        lng: userLng - 0.003,
      },
    ];

    // Calculate distances and sort by distance, then limit to 10
    const useMiles = isMilesCountry(userLat, userLng);
    const restaurantsWithDistance = mockData.map(restaurant => {
      const distanceKm = calculateDistance(userLat, userLng, restaurant.lat!, restaurant.lng!);
      const distance = useMiles ? kmToMiles(distanceKm) : distanceKm;
      return { ...restaurant, distance, useMiles };
    });

    return restaurantsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
  };

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
      <div className="min-h-screen bg-white text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="text-secondary">{loadingProgress}</p>
          <p className="text-sm text-secondary/70">Searching multiple restaurant types in parallel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-foreground hover:bg-muted text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <h1 className="text-lg sm:text-2xl font-bold font-serif text-primary text-center flex-1 mx-4">
            <span className="hidden sm:inline">SteakFinder Results</span>
            <span className="sm:hidden">Results</span>
          </h1>
          <div className="w-16 sm:w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Filters and Results */}
          <div className="space-y-4 sm:space-y-6">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedType === 'all' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-accent/10 flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                onClick={() => setSelectedType('all')}
              >
                {selectedType === 'all' && <Check className="h-3 w-3" />}
                All Types
              </Badge>
              {restaurantTypes.map((type) => (
                <Badge
                  key={type.key}
                  variant={selectedType === type.key ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-accent/10 flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                  onClick={() => setSelectedType(type.key)}
                >
                  {selectedType === type.key && <Check className="h-3 w-3" />}
                  <span className="hidden sm:inline">{type.icon} {type.label}</span>
                  <span className="sm:hidden">{type.icon}</span>
                </Badge>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-secondary text-sm sm:text-base">
              Found {filteredRestaurants.length} open restaurant{filteredRestaurants.length !== 1 ? 's' : ''} within 10{filteredRestaurants[0]?.useMiles ? 'mi' : 'km'}
            </p>

            {/* Restaurant Cards */}
            <div className="space-y-3 sm:space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} id={`restaurant-${restaurant.id}`} className="bg-white border border-border shadow-lg">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-primary text-lg sm:text-xl font-serif mb-2">{restaurant.name}</CardTitle>
                        <CardDescription className="text-secondary text-sm">
                          <div className="flex items-start gap-1">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{restaurant.vicinity}</span>
                          </div>
                          {restaurant.distance && (
                            <span className="block text-accent mt-1">
                              {restaurant.distance.toFixed(1)}{restaurant.useMiles ? 'mi' : 'km'} away
                            </span>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-primary font-medium text-sm sm:text-base">{restaurant.rating}</span>
                        </div>
                        {restaurant.priceLevel && (
                          <div className="text-secondary text-sm">
                            {'$'.repeat(restaurant.priceLevel)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {restaurantTypes.find(t => t.key === getRestaurantType(restaurant.types))?.icon} 
                          {' '}
                          <span className="hidden sm:inline">{restaurantTypes.find(t => t.key === getRestaurantType(restaurant.types))?.label || 'Steakhouse'}</span>
                          <span className="sm:hidden">{restaurantTypes.find(t => t.key === getRestaurantType(restaurant.types))?.label || 'Steakhouse'}</span>
                        </Badge>
                        {restaurant.currentOpeningHours?.openNow && (
                          <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                            Open Now
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {restaurant.websiteUri && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-teal-500 text-teal-500 hover:bg-teal-50 text-xs sm:text-sm px-3 sm:px-4"
                            onClick={() => window.open(restaurant.websiteUri, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Website</span>
                            <span className="sm:hidden">Web</span>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="bg-gray-900 hover:bg-gray-800 text-white font-medium shadow-sm text-xs sm:text-sm px-3 sm:px-4"
                          onClick={() => window.open(getDirectionsUrl(restaurant.placeId, restaurant.name), '_blank')}
                        >
                          <Navigation className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Directions</span>
                          <span className="sm:hidden">Go</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredRestaurants.length === 0 && (
                <Card className="bg-white border border-border shadow-lg">
                  <CardContent className="text-center py-12">
                    <p className="text-secondary text-lg">
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
                  <p className="text-sm text-secondary mt-2">
                    Showing sample data for demonstration purposes.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
