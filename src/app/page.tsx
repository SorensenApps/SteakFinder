'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Loader2 } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindNearMe = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        router.push(`/results?lat=${latitude}&lng=${longitude}`);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to get your location. Please try again.');
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Logo/Brand */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl sm:text-3xl">🥩</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">SteakFinder</h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto px-4">
              Find the nearest steakhouses and BBQ joints near you
            </p>
          </div>

          {/* Search Interface */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                Find Steak Near You
              </CardTitle>
              <CardDescription className="text-gray-600 text-base sm:text-lg">
                Discover the nearest steakhouses and BBQ joints nearby
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-4 sm:px-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Find Near Me Button */}
              <div className="text-center w-full overflow-hidden">
                <Button
                  onClick={handleFindNearMe}
                  disabled={isLoading}
                  className="bg-teal-500 hover:bg-teal-600 text-white py-4 sm:py-6 px-6 sm:px-12 text-lg sm:text-xl font-semibold shadow-lg hover:shadow-xl transition-all rounded-full w-full sm:w-auto max-w-full box-border"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 animate-spin" />
                      <span className="hidden sm:inline">Finding Your Location...</span>
                      <span className="sm:hidden">Finding...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                      <span className="hidden sm:inline">Find Near Me</span>
                      <span className="sm:hidden">Find Near Me</span>
                    </>
                  )}
                </Button>
                <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 px-4">
                  We'll use your current location to find nearby restaurants
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🥩</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Steakhouses</h3>
              <p className="text-gray-600 text-xs sm:text-sm px-2">Traditional steakhouses and fine dining</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🔥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">BBQ</h3>
              <p className="text-gray-600 text-xs sm:text-sm px-2">All types of BBQ joints and grills</p>
            </div>
          </div>

          {/* Blog Link */}
          <div className="mt-12 sm:mt-16 text-center pt-6 sm:pt-8 border-t border-gray-200 px-4">
            <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
              Part of the TravelKeto.ai family
            </p>
            <a 
              href="https://travelketo.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-600 font-semibold transition-colors text-sm sm:text-base"
            >
              Visit TravelKeto.ai →
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
