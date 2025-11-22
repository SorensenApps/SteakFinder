'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Coffee, Shirt, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Support Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2" />
            <h3 className="text-base sm:text-lg font-semibold text-primary">Support SteakFinder</h3>
          </div>
          <p className="text-secondary mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Help us keep SteakFinder free and continue building amazing tools for keto and carnivore travelers.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Buy Me a Coffee */}
            <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-primary mb-1 sm:mb-2 text-sm sm:text-base">Buy Me a Coffee</h4>
                <p className="text-xs sm:text-sm text-secondary mb-3 sm:mb-4">
                  Support development with a one-time donation
                </p>
                <Button 
                  asChild
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm px-3 sm:px-4"
                >
                  <a 
                    href="https://buymeacoffee.com/travelketoai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Coffee className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Support Now
                    <ExternalLink className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Shop Merch */}
            <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <Shirt className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-primary mb-1 sm:mb-2 text-sm sm:text-base">Shop Merch</h4>
                <p className="text-xs sm:text-sm text-secondary mb-3 sm:mb-4">
                  Shop our carnivore-proud merch!
                </p>
                <Button 
                  asChild
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 text-xs sm:text-sm px-3 sm:px-4"
                >
                  <a 
                    href="https://travelketoai.storenvy.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Shirt className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Shop Now
                    <ExternalLink className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6 sm:pt-8">
          <div className="text-center">
            <p className="text-secondary mb-2 text-sm sm:text-base">
              Part of the <span className="text-accent font-semibold">TravelKeto.ai</span> family
            </p>
            <a 
              href="https://travelketo.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center text-sm sm:text-base"
            >
              Visit TravelKeto.ai
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
