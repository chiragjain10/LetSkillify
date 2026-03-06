// Netlify Function: Dynamic sitemap.xml
// Generates sitemap from public routes + Firestore blogs (slug-first, falls back to id)
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore/lite');

function buildXml(urls) {
  const items = urls
    .map(
      (u) => `
  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq || 'weekly'}</changefreq>
    <priority>${u.priority || '0.5'}</priority>
  </url>`
    )
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

exports.handler = async (event) => {
  try {
    const host = (event.headers && (event.headers['x-forwarded-host'] || event.headers.host)) || 'letskillify.com';
    const proto = (event.headers && (event.headers['x-forwarded-proto'] || 'https')) || 'https';
    const base = `${proto}://${host}`;

    const firebaseConfig = {
      apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Static routes (public)
    const staticRoutes = [
      { loc: `${base}/`, changefreq: 'daily', priority: '1.0' },
      { loc: `${base}/about`, changefreq: 'weekly', priority: '0.8' },
      { loc: `${base}/courses`, changefreq: 'weekly', priority: '0.8' },
      { loc: `${base}/blogs`, changefreq: 'daily', priority: '0.9' },
      { loc: `${base}/products`, changefreq: 'weekly', priority: '0.6' },
      { loc: `${base}/templates`, changefreq: 'weekly', priority: '0.6' },
      { loc: `${base}/contact`, changefreq: 'monthly', priority: '0.5' },
      { loc: `${base}/founder`, changefreq: 'monthly', priority: '0.4' },
      { loc: `${base}/teammember`, changefreq: 'monthly', priority: '0.4' },
      { loc: `${base}/certificate`, changefreq: 'monthly', priority: '0.4' },
      { loc: `${base}/offering`, changefreq: 'monthly', priority: '0.4' },
      { loc: `${base}/activities`, changefreq: 'monthly', priority: '0.4' },
      { loc: `${base}/adventure`, changefreq: 'monthly', priority: '0.4' },
      { loc: `${base}/celebration`, changefreq: 'monthly', priority: '0.4' },
    ];

    // Blogs: include only published or already-live posts
    let blogUrls = [];
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const now = Date.now();
      blogUrls = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((b) => {
          if (b.status === 'scheduled' && b.publishAt && b.publishAt.toMillis && b.publishAt.toMillis() > now) {
            return false;
          }
          return true;
        })
        .map((b) => ({
          loc: `${base}/blog/${b.slug || b.id}`,
          lastmod:
            (b.publishAt && b.publishAt.toDate && b.publishAt.toDate().toISOString()) ||
            (b.createdAt && b.createdAt.toDate && b.createdAt.toDate().toISOString()) ||
            undefined,
          changefreq: 'weekly',
          priority: '0.7',
        }));
    } catch (_) {
      // If Firestore read fails, continue with static routes only
    }

    const xml = buildXml([...staticRoutes, ...blogUrls]);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'max-age=300' },
      body: xml,
    };
  } catch (err) {
    const fallback = buildXml([{ loc: 'https://letskillify.com/', changefreq: 'daily', priority: '1.0' }]);
    return { statusCode: 200, headers: { 'Content-Type': 'application/xml' }, body: fallback };
  }
};
