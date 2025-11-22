# Cloudflare Pages Migration Guide

This guide covers the migration of SteakFinder from Netlify to Cloudflare Pages.

## What Changed

### 1. Configuration Files
- **Removed**: `netlify.toml`
- **Added**: `_headers`, `_redirects`, `wrangler.toml`

### 2. Serverless Functions
- **Moved**: `netlify/functions/places.js` → `functions/api/places.ts`
- **Updated**: Function signature to use Cloudflare Workers API
- **Maintained**: Same API endpoint `/api/places`

### 3. Build Configuration
- **Updated**: `next.config.ts` with Cloudflare Pages compatibility
- **Added**: Wrangler CLI scripts to `package.json`

## Deployment Options

### Option 1: Cloudflare Dashboard (Recommended)
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Create a new project
3. Connect your Git repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (or leave empty)

### Option 2: Wrangler CLI
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run pages:deploy
```

### Option 3: Automated Scripts
```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Windows
deploy.bat
```

## Environment Variables

Set these in your Cloudflare Pages dashboard under Settings > Environment Variables:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

## Key Differences

| Feature | Netlify | Cloudflare Pages |
|---------|---------|------------------|
| Functions | `/.netlify/functions/` | `/api/` |
| Config | `netlify.toml` | `_headers`, `_redirects` |
| Runtime | Node.js | V8 isolates |
| CDN | Global | Global (faster) |

## Testing Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test Pages Functions locally
npm run pages:dev
```

## Troubleshooting

### Common Issues

1. **Function not found**: Ensure the function is in `functions/api/` directory
2. **CORS errors**: Check that CORS headers are properly set in the function
3. **Environment variables**: Verify they're set in Cloudflare Pages dashboard
4. **Build failures**: Check that `output: 'export'` is set in `next.config.ts`

### Debugging

```bash
# Check function logs
wrangler pages function tail

# Test function locally
wrangler pages dev out --local
```

## Benefits of Migration

- ⚡ **Faster cold starts** with V8 isolates
- 🌍 **Better global performance** with Cloudflare's CDN
- 💰 **Cost effective** for static sites
- 🔒 **Enhanced security** with Cloudflare's DDoS protection
- 🛠️ **Better developer experience** with Wrangler CLI

## Rollback Plan

If you need to rollback to Netlify:
1. Keep the original `netlify.toml` file
2. Restore `netlify/functions/places.js`
3. Revert `next.config.ts` changes
4. Deploy to Netlify as before

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Pages Functions Documentation](https://developers.cloudflare.com/pages/platform/functions/)

