// src/components/Courses/CoursesList.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTotalCourses } from "../../redux/counter/counterSlice"; // ✅ Redux action
import { MainContext } from "../Cart/MainProvider";
import { Helmet } from "react-helmet-async";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./CoursesList.css";

// 🔹 Slugify helper (generate clean URL slugs from titles)
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/[^\w-]+/g, "") // remove special characters
    .replace(/--+/g, "-"); // multiple dashes → single dash

const CoursesList = () => {
  const dispatch = useDispatch();

  const [visibleCount, setVisibleCount] = useState(6);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { coursesdata } = useContext(MainContext);

  const sampleCourses = [/* fallback sampleCourses array here */];
  const [Data, setData] = useState([]);

  // 🔹 Fetch courses (Firestore > localStorage > context > sample)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetched = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            slug: data.slug || slugify(data.title), // ✅ auto-generate slug
          };
        });
        if (fetched.length > 0) {
          setData(fetched);
          return;
        }
      } catch (err) {
        console.error("Error fetching courses from Firestore:", err);
      }

      // Fallback: localStorage > context > sample
      const adminCourses = JSON.parse(
        localStorage.getItem("adminCourses") || "[]"
      ).map((course) => ({
        ...course,
        slug: course.slug || slugify(course.title),
      }));

      if (adminCourses.length > 0) setData(adminCourses);
      else if (coursesdata?.length > 0)
        setData(
          coursesdata.map((course) => ({
            ...course,
            slug: course.slug || slugify(course.title),
          }))
        );
      else
        setData(
          sampleCourses.map((course) => ({
            ...course,
            slug: course.slug || slugify(course.title),
          }))
        );
    };

    fetchCourses();
  }, [coursesdata]);

  // 🔹 Sync URL params with category filters
  useEffect(() => {
    const categoriesFromParams = searchParams.getAll("category");
    setSelectedCategories(categoriesFromParams);
  }, [searchParams]);

  // 🔹 Filtering logic
  const filteredCourses = Data.filter((course) => {
    const matchesSearch = [course.category, course.title, course.tutor].some(
      (field) => field?.toLowerCase().includes(searchItem.toLowerCase())
    );
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(course.language);

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  // 🔹 Dispatch course count to Redux whenever it changes
  useEffect(() => {
    dispatch(setTotalCourses(filteredCourses.length));
  }, [filteredCourses, dispatch]);

  // 🔹 Helpers
  const toggleWishlist = (courseId) =>
    setWishlist((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );

  const loadMore = () => setVisibleCount((prev) => prev + 6);
  const handlerSearch = (e) => setSearchItem(e.target.value);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      setSearchParams(updated.length > 0 ? { category: updated } : {});
      return updated;
    });
  };

  const handleLanguageChange = (language) =>
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );

  // 🔹 Filter options
  const categories = [
    "Development",
    "Graphics",
    "Marketing",
    "Laws",
    "Finance",
    "Languages",
  ];
  const languages = ["English", "Hindi", "French", "Spanish"];

  return (
    <>
      <Helmet>
        <title>Explore Our Courses – Learn Full Stack Development</title>
        <meta
          name="description"
          content="Join our expert-led Full Stack Development courses..."
        />
        <meta
          name="keywords"
          content="Courses, MERN, React, Node.js, Web Development"
        />
      </Helmet>

      <div className="premium-courses-section">
        {/* shapes */}
        <div className="bg-shapes">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
          <div className="shape-3"></div>
        </div>

        {/* header */}
        <div className="courses-header">
          <div className="container">
            <h1 className="page-title">Explore Our Premium Courses</h1>
            <p className="page-subtitle">
              Learn from industry experts and advance your career
            </p>
          </div>
        </div>

        {/* main */}
        <div className="courses-main">
          <div className="container">
            <div className="courses-layout">
              {/* Sidebar Toggle */}
              <button
                className="mobile-filter-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <i className="fas fa-filter"></i> Filters
              </button>

              {/* Filters Sidebar */}
              <div className={`filters-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                  <h3>Filters</h3>
                  <button
                    className="close-sidebar"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                {/* Search */}
                <div className="filter-section">
                  <div className="search-box">
                    <i className="fas fa-search search-icon"></i>
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="search-input"
                      value={searchItem}
                      onChange={handlerSearch}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="filter-section">
                  <h4 className="filter-title">Category</h4>
                  <div className="filter-options">
                    {categories.map((category) => (
                      <label key={category} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="filter-section">
                  <h4 className="filter-title">Language</h4>
                  <div className="filter-options">
                    {languages.map((lang) => (
                      <label key={lang} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(lang)}
                          onChange={() => handleLanguageChange(lang)}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear filters */}
                <div className="filter-section">
                  <button
                    className="clear-filters-btn"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLanguages([]);
                      setSearchItem("");
                      setSearchParams({});
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="courses-content">
                <div className="courses-header-info">
                  <h2>Showing {filteredCourses.length} courses</h2>
                </div>

                <div className="courses-grid">
                  {filteredCourses.slice(0, visibleCount).map((course) => (
                    <Link
                      key={course.slug}
                      to={`/courses/courseDetails/${course.slug}`} // ✅ use slug here
                    >
                      <div className="premium-course-card">
                        <div className="card-content w-298 h-572">
                          <div className="course-image-enhanced">
                            <img
                              src={course.thumbnail}
                              style={{ objectFit: "contain" }}
                              alt={course.title}
                            />
                          </div>
                          <br />
                          <h3 className="course-title">{course.title}</h3>
                          <p className="course-desc">{course.short_desc}</p>

                          {course.rating && (
                            <div className="course-rating">
                              <span className="rating-stars">
                                {"★".repeat(Math.floor(course.rating))}
                                {course.rating % 1 !== 0 && "☆"}
                              </span>
                              <span className="rating-number">
                                {course.rating}
                              </span>
                            </div>
                          )}

                          <div className="instructor-info">
                            <div className="instructor-avatar">
                              <img
                                src="public/assets/images/review/Sk.png"
                                alt={course.tutor}
                                onError={(e) => {
                                  e.target.src =
                                    "/assets/images/default-avatar.png";
                                }}
                              />
                            </div>
                            <span className="instructor-name">
                              {course.tutor}
                            </span>
                          </div>

                          <div className="course-actions">
                            <button className="course-btn-enhanced flex-fill text-center">View more</button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {visibleCount < filteredCourses.length && (
                  <div className="load-more-wrapper">
                    <button className="load-more-btn" onClick={loadMore}>
                      Load More Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {sidebarOpen && (
            <div
              className="sidebar-overlay active"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
