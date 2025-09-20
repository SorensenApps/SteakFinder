# SteakFinder 🥩

A Progressive Web App (PWA) that helps you find nearby steakhouses, Brazilian BBQ, Korean BBQ, Argentine grills, American BBQ, and other meat-focused restaurants. Perfect for keto and carnivore travelers!

## Features

- 🎯 **Location-Based Search**: Find steakhouses near you using GPS
- 🌍 **Diverse Options**: Traditional steakhouses, Brazilian BBQ, Korean BBQ, Argentine grills, American BBQ
- 📱 **Mobile-First**: Optimized for mobile devices with PWA capabilities
- 🚀 **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎨 **Dark Theme**: Beautiful dark mode with steak-red accents
- 📍 **Easy Navigation**: Integrated Google Maps directions
- 💾 **Offline Support**: Works offline with service worker caching

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom dark theme
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Maps**: Google Maps Places API
- **Testing**: Jest with React Testing Library
- **PWA**: Service Worker with offline support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Google Maps API key (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SteakFinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Maps API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Google Maps API Setup

### Getting an API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Places API
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### Required APIs

- **Places API**: For searching restaurants
- **Maps JavaScript API**: For displaying maps (future feature)
- **Geocoding API**: For location services

### Billing Setup

The Places API requires billing to be enabled. Google provides a free tier with usage limits.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page with TravelKeto.ai CTA
│   ├── results/           # Restaurant results page
│   ├── layout.tsx         # Root layout with PWA metadata
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── loader.tsx
│   └── PWAInstaller.tsx   # Service worker registration
├── lib/
│   └── utils.ts           # Utility functions
public/
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
├── icon-192.svg          # App icon (192x192)
└── icon-512.svg          # App icon (512x512)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Testing

The project includes Jest and React Testing Library for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## PWA Features

### Installation
- Users can install SteakFinder as a native app on their devices
- Works on iOS, Android, and desktop browsers

### Offline Support
- Service worker caches app shell for offline access
- Shows user-friendly offline message when disconnected

### Performance
- Optimized for Lighthouse performance score > 90
- Minimal JavaScript bundle size
- Fast loading and smooth interactions

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | No (uses mock data if not provided) |
| `NEXT_PUBLIC_DEBUG` | Enable debug mode | No |

## Mock Data

If no Google Maps API key is provided, the app will use mock data for demonstration purposes. This allows you to test the app without setting up the API.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the TravelKeto.ai family. See the LICENSE file for details.

## Related Projects

- [TravelKeto.ai](https://travelketo.ai) - Complete keto travel planning platform

## Support

For support, please open an issue on GitHub or visit [TravelKeto.ai](https://travelketo.ai) for more resources.

---

Built with ❤️ for the keto and carnivore community
