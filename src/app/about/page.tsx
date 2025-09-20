'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Heart, Globe, Zap } from 'lucide-react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold font-serif text-primary">About SteakFinder</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold font-serif text-primary">
              Discover Meat-Focused Dining for Your <span className="text-accent">Keto Lifestyle</span>
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              SteakFinder is designed for keto and carnivore travelers who want to find the best 
              meat-focused restaurants wherever they go. From traditional steakhouses to authentic 
              BBQ experiences around the world.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="bg-white border border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary text-2xl font-serif">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary text-lg">
              We believe that finding quality meat-focused restaurants shouldn&apos;t be a challenge, 
              especially when you&apos;re following a keto or carnivore lifestyle. SteakFinder helps 
              you discover the best steakhouses, Brazilian BBQ, Korean BBQ, Argentine grills, American BBQ,
              and other meat-centric dining experiences near you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary font-serif">Quality Focused</h3>
                  <p className="text-sm text-secondary">
                    We prioritize restaurants known for high-quality meat and authentic preparation methods.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary font-serif">Global Reach</h3>
                  <p className="text-sm text-secondary">
                    Discover meat-focused dining experiences from different cultures and traditions worldwide.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary font-serif">Fast & Simple</h3>
                  <p className="text-sm text-secondary">
                    Get instant results with our streamlined interface designed for mobile-first experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TravelKeto.ai CTA */}
          <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="text-center">
              <CardTitle className="text-primary text-3xl font-serif">
                Ready for Your Next Adventure?
              </CardTitle>
              <CardDescription className="text-lg text-secondary">
                SteakFinder is part of the TravelKeto.ai family - your complete guide to keto-friendly travel
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                TravelKeto.ai helps you plan, prepare, and enjoy keto-friendly travel experiences. 
                From finding keto-friendly restaurants to planning your meals and discovering local 
                keto communities around the world.
              </p>
              
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold !text-white"
                  onClick={() => window.open('https://travelketo.ai', '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2 text-white" />
                  Visit TravelKeto.ai
                </Button>
                
                <div className="text-sm text-secondary">
                  <p>Discover more keto travel resources, meal planning tools, and community features</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary font-serif">What Makes SteakFinder Different?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Specialized Focus:</strong> We focus specifically on meat-centric restaurants that cater to keto and carnivore diets.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Cultural Diversity:</strong> Discover authentic BBQ and grill experiences from Brazilian, Korean, Argentine, American, and other traditions.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Mobile Optimized:</strong> Built for travelers on the go with fast loading and offline capabilities.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Progressive Web App:</strong> Install SteakFinder on your device for instant access wherever you travel.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary font-serif">Perfect For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Keto Travelers:</strong> Find restaurants that align with your low-carb, high-fat lifestyle.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Carnivore Dieters:</strong> Discover restaurants that prioritize quality meat and animal products.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Food Enthusiasts:</strong> Explore authentic BBQ and grill experiences from around the world.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary">
                    <strong className="text-primary">Business Travelers:</strong> Quickly find quality dining options in unfamiliar cities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-12 border-t border-border">
            <h3 className="text-2xl font-bold font-serif text-primary mb-4">
              Start Finding Your Perfect Steak Today
            </h3>
            <Button
              size="lg"
              onClick={() => router.push('/')}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold !text-white"
            >
              Find Steakhouses Near Me
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
