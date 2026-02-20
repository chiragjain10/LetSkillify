import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// Firebase imports
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Banner() {
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Firestore state
  const [totalCourses, setTotalCourses] = useState(0);

  // ✅ Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
        setFilteredCourses(coursesData);
        setTotalCourses(coursesData.length);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Search function
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    const result = searchTerm
      ? courses.filter((course) =>
          course.title && course.title.toLowerCase().includes(searchTerm)
        )
      : courses;
    setFilteredCourses(result);
  };

  return (
    <>
      {/* Banner Section */}
      <section className="position-relative pb-sm-5 overflow-hidden">
        {/* 🔹 Background Animated Blobs & Circles */}
        <div className="position-absolute top-0 start-0 w-100 h-100 z-n1 overflow-hidden">
          {/* Floating Blob 1 */}
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: "250px",
              height: "250px",
              background: "rgba(13, 110, 253, 0.3)", // blue
              top: "-80px",
              left: "-80px",
              filter: "blur(60px)",
            }}
            animate={{ y: [0, 40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Blob 2 */}
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: "200px",
              height: "200px",
              background: "rgba(255, 193, 7, 0.3)", // yellow
              bottom: "50px",
              right: "-50px",
              filter: "blur(50px)",
            }}
            animate={{ y: [0, -30, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Circle */}
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(111, 66, 193, 0.25)", // purple
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <div className="container">
          <div className="row align-items-center justify-content-xl-between g-4 g-md-5">
            {/* LEFT SECTION */}
            <motion.div className="col-lg-6 col-xl-6 position-relative z-index-1 text-center text-lg-start mb-2 mb-md-5 mb-xl-0 mb-sm-6">
              <div className="bannerSec">
                <motion.h6
                  whileHover={{ scale: 1.05 }}
                  className="mb-3 font-base bg-primary bg-opacity-10 text-primary py-2 px-4 rounded-2 d-inline-block"
                >
                  Get started with LetSkillify
                </motion.h6>
                <h1 className="mb-4 display-6 heading1">
                  <TypeAnimation
                    sequence={[
                      "Master Class in Web Development",
                      2000,
                      "Learn Full Stack Development",
                      2000,
                      "Build Real World Projects",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h1>
                <p className="mb-3">
                  A space where Anyone can become a complete Full stack
                  developer by project based learning{" "}
                  <b>
                    (HTML, CSS, JS, Mongo DB, Node JS, React JS, Tailwind and AI)
                  </b>
                </p>

                {/* SEARCH */}
                <div className="position-relative">
                  <form className="border rounded p-2 mb-1">
                    <div className="input-group">
                      <input
                        className="form-control border-0 me-1"
                        type="search"
                        placeholder="Find your course"
                        value={query}
                        onChange={handleSearch}
                      />
                      <button
                        type="button"
                        className="btn btn-primary mb-0 rounded"
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>

                  {/* Search Results */}
                  {query && (
                    <ul className="list-group mb-3 border border-start-0 border-end-0 pt-0 pe-0 position-absolute form-control underline" style={{ zIndex: 1000, maxHeight: "300px", overflowY: "auto" }}>
                      {loading ? (
                        <li className="list-group-item text-center">
                          <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Loading courses...
                        </li>
                      ) : filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                          <li key={course.id || index} className="list-group-item">
                            <Link
                              className="text-dark text-decoration-none d-block"
                              to={`/courses/courseDetails/${course.slug}`}
                              onClick={() => setQuery("")} // Clear search after selection
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <span>{course.title || 'Untitled Course'}</span>
                                {course.isPaid !== undefined && (
                                  <span className={`badge ${course.isPaid ? 'bg-success' : 'bg-primary'}`}>
                                    {course.isPaid ? `₹${course.price || '0'}` : 'FREE'}
                                  </span>
                                )}
                              </div>
                              {course.category && (
                                <small className="text-muted d-block">{course.category}</small>
                              )}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">
                          <i className="bi bi-search me-2"></i>
                          No courses found matching "{query}"
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SECTION (Video + Bell) */}
            <motion.div className="col-lg-6 col-xl-6 text-center position-relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 2 },
                  rotate: { duration: 0.5 },
                }}
                className="icon-lg bg-primary text-white rounded-4 shadow position-absolute top-0 start-100 translate-middle z-index-9 ms-n4 d-none d-md-block bell-icon"
              >
                <i className="fas fa-bell"></i>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="position-relative"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-warning rounded-4 border border-warning border-5 shadow video"
                >
                  <iframe
                    className="rounded-4"
                    width="100%"
                    height="100%"
                    src="https://www.youtube-nocookie.com/embed/n-q7VlmS3ok?autoplay=1&mute=1&loop=1&playlist=n-q7VlmS3ok"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-0 py-xl-5">
        <div className="container">
          <div className="row g-4">
            {/* 🔹 Online Courses (from Firestore) */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-warning mb-0">
                  <i className="fas fa-tv"></i>
                </span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5>
                      <CountUp start={0} end={totalCourses} duration={2} delay={0} />
                    </h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">Online Courses</p>
                </div>
              </div>
            </div>

            {/* Expert Tutors */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-blue bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-blue mb-0">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5>
                      <CountUp start={0} end={11} duration={2} delay={0} />
                    </h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">Expert Tutors</p>
                </div>
              </div>
            </div>

            {/* Online Students */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-purple mb-0">
                  <i className="fas fa-user-graduate"></i>
                </span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5>
                      <CountUp start={0} end={155} duration={2} delay={0} />
                    </h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">Online Students</p>
                </div>
              </div>
            </div>

            {/* Internship Members */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-info mb-0">
                  <i className="bi bi-patch-check-fill"></i>
                </span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5>
                      <CountUp start={0} end={25} duration={2} delay={0} />
                    </h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">Internship Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
