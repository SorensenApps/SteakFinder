/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

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
}

interface MapViewProps {
  restaurants: Restaurant[];
  userLat: number;
  userLng: number;
  onRestaurantClick?: (restaurant: Restaurant) => void;
}

export default function MapView({ restaurants, userLat, userLng, onRestaurantClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!mapRef.current) return;

      try {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          initializeMap();
          return;
        }

        // Load Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          setMapLoaded(true);
          initializeMap();
        };
        
        script.onerror = () => {
          setMapError('Failed to load Google Maps');
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapError('Failed to load Google Maps');
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: userLat, lng: userLng },
        zoom: 13,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#1a1a1a' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#2c2c2c' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#3a3a3a' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#2a2a2a' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        clickableIcons: false
      });

      // Add user location marker
      new window.google.maps.Marker({
        position: { lat: userLat, lng: userLng },
        map: map,
        title: 'Your Location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Add restaurant markers
      restaurants.forEach((restaurant) => {
        if (restaurant.lat && restaurant.lng) {
          const marker = new window.google.maps.Marker({
            position: { lat: restaurant.lat, lng: restaurant.lng },
            map: map,
            title: restaurant.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#ef4444',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          }) as any;

          // Add click listener
          (marker as any).addListener('click', () => {
            if (onRestaurantClick) {
              onRestaurantClick(restaurant);
            }
          });

          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="color: #000; padding: 8px;">
                <h3 style="margin: 0 0 4px 0; font-size: 14px;">${restaurant.name}</h3>
                <p style="margin: 0; font-size: 12px; color: #666;">${restaurant.vicinity}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">⭐ ${restaurant.rating}</p>
              </div>
            `
          }) as any;

          (marker as any).addListener('click', () => {
            (infoWindow as any).open(map, marker);
          });
        }
      });
    };

    loadMap();
  }, [restaurants, userLat, userLng, onRestaurantClick]);

  if (mapError) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">Map unavailable</p>
          <p className="text-sm text-muted-foreground">{mapError}</p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-square rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
