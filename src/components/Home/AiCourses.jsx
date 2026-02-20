import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { db } from "../../firebase"; // adjust path
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MainContext } from '../Cart/MainProvider';

// Slugify helper function
const slugify = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-") || "";
};

const AiCourses = () => {
  const [newCourses, setNewCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setVisible } = useContext(MainContext); // ✅ Fixed: moved inside component

  useEffect(() => {
    const q = query(collection(db, "courses"), where("isNew", "==", true));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const courses = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            slug: data.slug || slugify(data.title), // ✅ Ensure slug exists
          };
        });
        setNewCourses(courses);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const renderStars = (rating = 0) => { // ✅ Added default value
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning me-1" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={`half-${fullStars}`} className="text-warning me-1" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-muted me-1" />);
    }

    return stars;
  };

  return (
    <>
      <Helmet>
        <title>New AI Courses – Learn the Future Today</title>
        <meta
          name="description"
          content="Hands-on AI courses designed to make you industry ready. Learn AI with Python, build your own AI, and master AI tools."
        />
        <meta
          name="keywords"
          content="AI with Python course India, build your own AI, Python AI training, AI for students, AI daily life course, AI productivity hacks, learn AI tools India"
        />
      </Helmet>

      <section id="ai-courses" className="py-5 position-relative overflow-hidden" style={{ backgroundColor: '#f9fafc' }}>

        {/* 🔹 Animated SVG Background */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 400"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ zIndex: 0, pointerEvents: 'none' }}
          preserveAspectRatio="none"
        >
          {/* Blob 1 */}
          <motion.circle
            cx="200"
            cy="200"
            r="120"
            fill="rgba(6,106,201,0.12)"
            animate={{ 
              cx: [180, 220, 180, 180], 
              cy: [180, 220, 180, 180] 
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          />
          {/* Blob 2 */}
          <motion.circle
            cx="600"
            cy="180"
            r="150"
            fill="rgba(255,193,7,0.12)"
            animate={{ 
              cx: [580, 620, 580, 580], 
              cy: [160, 200, 160, 160] 
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          />
          {/* Abstract Shape */}
          <motion.path
            d="M0,300 Q400,100 800,300 L800,400 L0,400 Z"
            fill="none"
            stroke="rgba(6,106,201,0.15)"
            strokeWidth="60"
            animate={{
              d: [
                "M0,300 Q400,100 800,300 L800,400 L0,400 Z",
                "M0,320 Q400,120 800,280 L800,400 L0,400 Z",
                "M0,300 Q400,100 800,300 L800,400 L0,400 Z"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.svg>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="fw-bold mb-2" style={{ fontSize: '2rem', color: '#222' }}>
              New AI Courses – Learn the Future Today
            </h4>
            <p style={{ color: '#555', fontSize: '1.1rem' }}>
              Hands-on AI courses designed to make you industry ready
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <motion.div
              className="row g-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {newCourses.length > 0 ? (
                newCourses.map(course => (
                  <div className="col-md-6 col-lg-4" key={course.id}>
                    <motion.div
                      className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
                      variants={cardVariants}
                      whileHover={{ scale: 1.03 }}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Thumbnail */}
                      {course.thumbnail && (
                        <Link
                          to={`/courses/courseDetails/${course.slug || slugify(course.title)}`} 
                          style={{ textDecoration: "none" }}
                        >
                          <div style={{ height: '230px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-100 h-100"
                              style={{
                                objectFit: 'contain',
                                padding: '10px',
                                transition: 'transform 0.3s ease'
                              }}
                              onError={(e) => {
                                e.target.src = "/assets/images/default.webp";
                              }}
                            />
                          </div>
                        </Link>
                      )}

                      <div className="card-body d-flex flex-column p-4">
                        <Link
                          to={`/courses/courseDetails/${course.slug || slugify(course.title)}`} 
                          style={{ textDecoration: "none", color: 'inherit' }}
                        >
                          <div className="d-flex align-items-center mb-2" style={{ color: 'rgb(6,106,201)' }}>
                            <i className="fas fa-robot me-2"></i>
                            <span className="fw-semibold text-uppercase small">{course.category || 'AI'}</span>
                          </div>

                          <h5
                            className="fw-bold mb-2"
                            style={{
                              color: '#1e1e1e',
                              fontSize: '1.15rem',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {course.title}
                          </h5>

                          <p
                            className="small text-muted"
                            style={{
                              lineHeight: 1.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              minHeight: '3em',
                              marginBottom: '0.5rem'
                            }}
                          >
                            {course.short_desc || 'No description available'}
                          </p>

                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="d-flex align-items-center">
                              {renderStars(course.rating)}
                              <span className="ms-1 text-dark fw-semibold">{course.rating?.toFixed(1) || '0.0'}</span>
                            </div>
                            <span className="badge rounded-pill bg-light text-dark px-3 py-1">
                              {course.difficulty || 'Beginner'}
                            </span>
                          </div>
                        </Link>

                        <div className="d-flex gap-2 mt-4">
                          <Link
                            to={`/courses/courseDetails/${course.slug || slugify(course.title)}`}
                            className="course-btn-enhanced flex-fill text-center"
                          >
                            Explore
                          </Link>
                          <button
                            className="course-btn-enhanced course-btn-secondary flex-fill"
                            onClick={() => setVisible && setVisible(true)}
                          >
                            Enroll
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted mb-3">No new AI courses available right now.</p>
                  <Link to="/courses" className="course-btn-enhanced">
                    Browse All Courses
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {newCourses.length > 0 && (
            <motion.div
              className="text-center mt-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/courses" 
                className="course-btn-enhanced"
                style={{
                  padding: '12px 30px',
                  background: 'rgb(6,106,201)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-block'
                }}
              >
                Explore All Courses
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default AiCourses;