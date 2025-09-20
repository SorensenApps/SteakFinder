'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Heart, Globe, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

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
          <h1 className="text-2xl font-bold text-primary">About SteakFinder</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Discover Meat-Focused Dining for Your <span className="text-primary">Keto Lifestyle</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              SteakFinder is designed for keto and carnivore travelers who want to find the best 
              meat-focused restaurants wherever they go. From traditional steakhouses to authentic 
              BBQ experiences around the world.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-lg">
              We believe that finding quality meat-focused restaurants shouldn&apos;t be a challenge, 
              especially when you&apos;re following a keto or carnivore lifestyle. SteakFinder helps 
              you discover the best steakhouses, Brazilian BBQ, Korean BBQ, Argentine grills, American BBQ,
              and other meat-centric dining experiences near you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white">Quality Focused</h3>
                  <p className="text-sm text-muted-foreground">
                    We prioritize restaurants known for high-quality meat and authentic preparation methods.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover meat-focused dining experiences from different cultures and traditions worldwide.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white">Fast & Simple</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant results with our streamlined interface designed for mobile-first experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TravelKeto.ai CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">
                Ready for Your Next Adventure?
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                SteakFinder is part of the TravelKeto.ai family - your complete guide to keto-friendly travel
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                TravelKeto.ai helps you plan, prepare, and enjoy keto-friendly travel experiences. 
                From finding keto-friendly restaurants to planning your meals and discovering local 
                keto communities around the world.
              </p>
              
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold"
                  onClick={() => window.open('https://travelketo.ai', '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit TravelKeto.ai
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  <p>Discover more keto travel resources, meal planning tools, and community features</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">What Makes SteakFinder Different?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Specialized Focus:</strong> We focus specifically on meat-centric restaurants that cater to keto and carnivore diets.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Cultural Diversity:</strong> Discover authentic BBQ and grill experiences from Brazilian, Korean, Argentine, American, and other traditions.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Mobile Optimized:</strong> Built for travelers on the go with fast loading and offline capabilities.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Progressive Web App:</strong> Install SteakFinder on your device for instant access wherever you travel.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">Perfect For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Keto Travelers:</strong> Find restaurants that align with your low-carb, high-fat lifestyle.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Carnivore Dieters:</strong> Discover restaurants that prioritize quality meat and animal products.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Food Enthusiasts:</strong> Explore authentic BBQ and grill experiences from around the world.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-white">Business Travelers:</strong> Quickly find quality dining options in unfamiliar cities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-12 border-t border-border">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Finding Your Perfect Steak Today
            </h3>
            <Button
              size="lg"
              onClick={() => router.push('/')}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold"
            >
              Find Steakhouses Near Me
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
