# Sitemap Configuration

This directory contains dynamic sitemap generation files for Vercel deployment.

## Files Created:

### 1. `vercel.json`
- Vercel deployment configuration
- Sets up API routes for dynamic sitemap generation
- Includes security headers and caching rules
- Configures serverless functions for sitemap endpoints

### 2. `src/api/sitemap.js`
- Generates XML sitemap dynamically from Firebase data
- Fetches data from all collections: courses, blogs, activities, adventures, celebrations, team, students, teachers
- Updates automatically when data changes in admin panel
- Includes proper SEO metadata (lastmod, changefreq, priority)

### 3. `src/api/sitemap.txt.js`
- Generates text-based sitemap for additional SEO benefits
- Lists all static and dynamic pages
- Auto-updates with Firebase data changes

## Environment Variables Required:

Add these to your Vercel environment variables:

```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## Usage:

### XML Sitemap:
```
https://your-domain.vercel.app/api/sitemap
```

### Text Sitemap:
```
https://your-domain.vercel.app/api/sitemap.txt
```

## Features:

✅ **Dynamic Updates** - Sitemap updates automatically when you add/edit/delete content in admin panel
✅ **All Collections** - Includes courses, blogs, activities, adventures, celebrations, team members, students, teachers
✅ **SEO Optimized** - Proper priority, changefreq, and lastmod values
✅ **Cached** - 1-hour cache to improve performance
✅ **Error Handling** - Graceful error handling with proper HTTP status codes

## Deployment:

1. Push your code to GitHub
2. Deploy to Vercel
3. Set environment variables in Vercel dashboard
4. Access sitemaps at the URLs above

## Search Engine Submission:

Submit these URLs to Google Search Console:
- `https://your-domain.vercel.app/api/sitemap`
- `https://your-domain.vercel.app/api/sitemap.txt`

The sitemaps will automatically update whenever you modify content through the admin panel!
