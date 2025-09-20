'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
      console.log('PWA install prompt available');
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    // Detect mobile device
    const detectMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    // Check if we should show manual instructions after a delay
    const checkForManualInstall = () => {
      // On mobile, if no install prompt appears after 3 seconds, show manual instructions
      if (isMobile && !deferredPrompt) {
        setTimeout(() => {
          if (!isInstalled && !showInstallButton) {
            setShowManualInstructions(true);
          }
        }, 3000);
      }
    };

    detectMobile();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    checkIfInstalled();
    checkForManualInstall();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (isInstalled) {
    return null;
  }

  // Show manual install instructions for mobile when no prompt is available
  if (isMobile && showManualInstructions && !showInstallButton) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🥩</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                Install SteakFinder
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad') 
                  ? 'Tap the share button (📤) and select "Add to Home Screen"'
                  : 'Tap the menu (⋮) and select "Add to Home Screen" or "Install App"'
                }
              </p>
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={() => setShowManualInstructions(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs px-3 py-1"
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🥩</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Install SteakFinder
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Get quick access to find steakhouses near you
            </p>
            <div className="flex space-x-2 mt-3">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="text-xs px-3 py-1"
              >
                Install
              </Button>
              <Button
                onClick={() => setShowInstallButton(false)}
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1"
              >
                Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
