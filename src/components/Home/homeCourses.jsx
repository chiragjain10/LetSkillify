import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../Cart/MainProvider';
import { db } from '../../firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

function HomeCourses({ userId }) { // Pass logged-in user's ID as prop
  const [activetab, setactivetab] = useState('Development');
  const [wishlist, setWishlist] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const { setVisible } = useContext(MainContext);

  const slugify = (str = '') =>
    String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const courses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllCourses(courses);
      } catch (error) {
        console.error('Error fetching courses from Firestore:', error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch user wishlist from Firebase
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const wishlistRef = doc(db, 'wishlists', userId);
        const wishlistSnap = await getDoc(wishlistRef);
        if (wishlistSnap.exists()) {
          setWishlist(wishlistSnap.data().courses || []);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, [userId]);

  const handleClick = (category) => setactivetab(category);

  // Toggle wishlist locally and in Firebase
  const toggleWishlist = async (courseId) => {
    if (!userId) {
      alert('Please login to save wishlist!');
      return;
    }

    let updatedWishlist;
    if (wishlist.includes(courseId)) {
      updatedWishlist = wishlist.filter((id) => id !== courseId);
    } else {
      updatedWishlist = [...wishlist, courseId];
    }
    setWishlist(updatedWishlist);

    // Save updated wishlist in Firebase
    try {
      const wishlistRef = doc(db, 'wishlists', userId);
      await setDoc(wishlistRef, { courses: updatedWishlist }, { merge: true });
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleCallNow = () => {
    window.open('tel:+917987841662', '_self');
  };

  const coursesToDisplay = allCourses.filter((item) => item.category === activetab);
  const coursesToDisplayLimited = coursesToDisplay.slice(0, 8);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="home-courses-enhanced">
      <div className="container home-courses-content">
        {/* Header */}
        <div className="row mb-2">
          <div className="col-lg-8 mx-auto courses-header-enhanced text-center">
            <h2 className="courses-title-enhanced">Courses</h2>
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>Choose from hundreds of courses from specialist organizations</span>
              <span className="badge-dot"></span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-pills nav-pills-bg-soft justify-content-sm-center mb-4 px-3" role="tablist">
          {['Development', 'Graphics', 'Marketing', 'Laws', 'Finance'].map((category, i) => (
            <li className="nav-item me-2 me-sm-5" key={i}>
              <button
                className={`course-tab-enhanced ${activetab === category ? 'active' : ''}`}
                type="button"
                role="tab"
                onClick={() => handleClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Dropdown */}
        <div className="nav-item dropdown mb-3 mobile" style={{ listStyle: 'none' }}>
          <Link
            className="nav-link dropdown-toggle border p-2 rounded droper"
            to="#"
            data-bs-toggle="dropdown"
          >
            {activetab}
          </Link>
          <ul className="dropdown-menu w-100 border p-0">
            {['Development', 'Graphics', 'Marketing', 'Laws', 'Finance'].map((category, i) => (
              <li
                className="nav-item ps-2 pt-2 p-1 border-bottom mb-1"
                onClick={() => handleClick(category)}
                key={i}
              >
                <button
                  className={`nav-link mb-2 mb-md-0 ${activetab === category ? 'active' : ''}`}
                  type="button"
                  role="tab"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div className="tab-content mt-3">
          <div className="tab-pane fade show active" role="tabpanel">
            {coursesToDisplayLimited.length > 0 ? (
              <div className="row g-4">
                {coursesToDisplayLimited.map((item, index) => (
                  <motion.div
                    className="col-sm-6 col-lg-4 col-xl-3"
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    variants={cardVariants}
                  >
                    <div className="couser-container">
                      <div className="course-card-home-enhanced shadow-sm rounded h-100 d-flex flex-column">
                        {/* Image */}
                        <div className="course-image-enhanced mb-1">
                          <img
                            src={item.thumbnail}
                            className="card-img-top"
                            alt="course"
                            style={{ objectFit: 'contain' }}
                            onError={(e) => { e.target.src = '/assets/images/default.jpeg'; }}
                          />
                        </div>

                        {/* Content */}
                        <div className="course-content-enhanced mt-2 mb-3 flex-grow-1">
                          <div className="course-category-enhanced mb-3" style={{ fontSize: '0.95rem', fontWeight: '600', color: '#0c72b6ff' }}>
                            {item.category || 'Course'}
                          </div>
                          <h5 className="course-title-enhanced" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                            <Link to={`/courses/courseDetails/${item.slug || slugify(item.title)}`} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                          </h5>
                          <p className="course-desc-enhanced" style={{ fontSize: '0.9rem', color: '#666' }}>
                            {item.desc || item.short_desc}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="course-footer-enhanced pt-2 border-top">
                          <div className="course-buttons-enhanced d-flex gap-2">
                            <Link className="course-btn-enhanced flex-fill text-center" onClick={() => setVisible(true)}>Enquire now</Link>
                            <button className="course-btn-enhanced course-btn-secondary flex-fill" onClick={handleCallNow}>Call Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center my-4">
                <h4>Pending</h4>
                <p>No courses available for this category at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* View All */}
        <div className="nav nav-pills justify-content-sm-center mt-3">
          <Link className="course-tab-enhanced mt-5" to="/Courses">View All</Link>
        </div>
      </div>
    </section>
  );
}

export default HomeCourses;
