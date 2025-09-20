'use client';

import { useEffect } from 'react';

export default function PWAInstaller() {
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

    // Handle PWA install prompt (let browser handle naturally)
    window.addEventListener('beforeinstallprompt', (e) => {
      // Don't prevent default - let browser show install banner
      console.log('PWA install prompt available');
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
    });
  }, []);

  return null;
}
