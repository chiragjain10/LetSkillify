const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // Set content type to plain text
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const baseUrl = 'https://letskillify.com';

    // Fetch data from Firebase collections
    const [coursesSnapshot, blogsSnapshot] = await Promise.all([
      getDocs(collection(db, 'courses')),
      getDocs(collection(db, 'blogs'))
    ]);

    const courses = coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      slug: doc.data().slug
    }));
    
    const blogs = blogsSnapshot.docs.map(doc => ({
      id: doc.id,
      slug: doc.data().slug
    }));

    // Generate URLs
    const urls = [
      baseUrl,
      `${baseUrl}/about`,
      `${baseUrl}/courses`,
      `${baseUrl}/teammember`,
      `${baseUrl}/activities`,
      `${baseUrl}/adventure`,
      `${baseUrl}/celebration`,
      `${baseUrl}/contact`,
      ...courses.map(course => `${baseUrl}/courses/courseDetails/${course.slug || course.id}`),
      ...blogs.map(blog => `${baseUrl}/blog/${blog.slug || blog.id}`)
    ];

    // Remove duplicates and join with newlines
    const sitemapContent = [...new Set(urls)].join('\n');

    res.status(200).send(sitemapContent);
  } catch (error) {
    console.error('Sitemap.txt generation error:', error);
    res.status(500).send('Error generating sitemap.txt');
  }
};