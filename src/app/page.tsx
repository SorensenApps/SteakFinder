'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Utensils, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFindSteakhouses = async () => {
    setIsLoading(true);
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser. Please enable location services or use a different browser.');
      setIsLoading(false);
      return;
    }

    // Get user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Navigate to results page with coordinates
        router.push(`/results?lat=${latitude}&lng=${longitude}`);
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Unable to get your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location services and allow access to your location.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        alert(errorMessage);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-3">
          <Utensils className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-bold font-serif text-primary">SteakFinder</h1>
          <span className="text-4xl">🥩</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold font-serif text-primary">
              Find Your Nearest <span className="text-accent">Steak Fix</span>
            </h2>
            <p className="text-xl text-secondary">
              Discover steakhouses, Brazilian BBQ, Korean BBQ, Argentine grills, American BBQ, and more near you. 
              Perfect for your keto and carnivore lifestyle.
            </p>
          </div>

          {/* CTA Button */}
          <div className="py-8">
            <button
              onClick={handleFindSteakhouses}
              disabled={isLoading}
              style={{
                backgroundColor: '#00BFA6',
                color: '#FFFFFF',
                border: '2px solid rgba(0, 191, 166, 0.2)',
                borderRadius: '16px',
                padding: '32px 64px',
                fontSize: '20px',
                fontWeight: 'bold',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                minWidth: '320px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                opacity: isLoading ? 0.5 : 1,
                pointerEvents: isLoading ? 'none' : 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 191, 166, 0.9)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#00BFA6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '2px solid #FFFFFF',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ color: '#FFFFFF', fontSize: '20px' }}>Finding Steakhouses...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
                  <span style={{ color: '#FFFFFF', fontSize: '20px' }}>Find Steakhouses Near Me</span>
                </div>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white border border-border shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-primary font-serif">Location-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary">
                  Find the closest steakhouses using your GPS location for accurate results.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border border-border shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-primary font-serif">Diverse Options</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary">
                  From traditional steakhouses to Brazilian BBQ, Korean BBQ, and American BBQ - we&apos;ve got you covered.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border border-border shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Navigation className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-primary font-serif">Easy Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary">
                  Get directions instantly with integrated Google Maps navigation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
