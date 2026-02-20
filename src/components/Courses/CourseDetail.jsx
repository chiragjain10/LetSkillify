// src/components/Courses/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseBySlug = async () => {
      try {
        const coursesRef = collection(db, "courses");
        const q = query(coursesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setCourse({ id: docData.id, ...docData.data() });
        } else {
          console.error("No course found with this slug!");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseBySlug();
  }, [slug]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="fw-bold fs-5">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-5">
        <p className="fs-4 text-danger">Course not found!</p>
        <Link to="/courses" className="btn btn-outline-secondary mt-3">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  // ✅ Defaults agar Firebase me na ho
  const {
    title,
    thumbnail,
    tutor,
    tutor_image,
    full_desc,
    short_desc,
    rating = 4.5,
    enrolled = "10k",
    level = "All levels",
    duration = "6 Months",
    price = 4999,
    curriculum = [],
  } = course;

  return (
    <>
      <Helmet>
        <title>{title} – Learn Full Stack Development</title>
        <meta
          name="description"
          content={short_desc || "Join our expert-led course..."}
        />
      </Helmet>

      <div className="container py-5">
        {/* Back button */}
        <Link to="/courses" className="btn btn-outline-primary mb-4">
          ← Back to Courses
        </Link>

        {/* Thumbnail Image */}
        {thumbnail && (
          <div className="mb-4 text-center">
            <img
              src={thumbnail}
              alt={title}
              className="img-fluid rounded"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-4">
          <h1 className="fw-bold">{title}</h1>
          <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
            <span className="text-warning fw-bold">⭐ {rating}/5.0</span>
            <span className="text-muted">👨‍🎓 {enrolled} Enrolled</span>
            <span className="text-success">📊 {level}</span>
            <span className="text-primary">⏳ {duration}</span>
            <span className="text-danger">💰 ₹{price}</span>
          </div>
        </div>

        {/* Instructor */}
        {tutor && (
          <div className="d-flex align-items-center mb-4">
            <img
              src={tutor_image || "https://via.placeholder.com/60"}
              alt={tutor}
              className="rounded-circle me-3"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div>
              <h6 className="mb-1">{tutor}</h6>
              <small className="text-muted">Instructor</small>
            </div>
          </div>
        )}

        <div className="row g-5">
          {/* LEFT COLUMN */}
          <div className="col-lg-8">
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button className="nav-link active">Overview</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Reviews</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">FAQs</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Comment</button>
              </li>
            </ul>

            {/* Course Description */}
            <h4 className="fw-bold">Course Description</h4>
            <p className="text-secondary fs-6"
              style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
              dangerouslySetInnerHTML={{ __html: full_desc || short_desc }}></p>

            {/* What you'll learn */}
            <h4 className="fw-bold mt-4">What you’ll learn</h4>
            <ul className="list-group list-group-flush shadow-sm">
              <li className="list-group-item">
                ✅ Master frontend & backend development
              </li>
              <li className="list-group-item">
                ✅ Work with MongoDB, Express.js, React, Node.js
              </li>
              <li className="list-group-item">
                ✅ Build real-world web applications
              </li>
              <li className="list-group-item">
                ✅ Prepare for job-ready skills
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-4 sticky-top">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Course Curriculum</h5>

                <div className="accordion" id="courseAccordion">
                  {(curriculum.length > 0
                    ? curriculum
                    : [
                        {
                          title: "Introduction",
                          lectures: [
                            "Intro (2 min)",
                            "Setup (5 min)",
                            "Basics (10 min)",
                          ],
                        },
                        {
                          title: "Frontend Development",
                          lectures: [
                            "HTML & CSS",
                            "JavaScript",
                            "React Components",
                          ],
                        },
                        {
                          title: "Backend Development",
                          lectures: [
                            "Node.js & Express",
                            "MongoDB",
                            "REST APIs",
                          ],
                        },
                      ]
                  ).map((module, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#module${index}`}
                        >
                          {module.title}
                        </button>
                      </h2>
                      <div
                        id={`module${index}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        data-bs-parent="#courseAccordion"
                      >
                        <div className="accordion-body">
                          <ul className="list-unstyled mb-0">
                            {module.lectures.map((lec, i) => (
                              <li key={i}>▶ {lec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-lg btn-primary w-100">
                    🚀 Enroll Now
                  </button>
                </div>
                {/* Instructor Section */}
                {course.tutor && (
                  <section className="py-5 bg-white">
                    <div className="container text-center">
                      <h2 className="fw-bold text-primary mb-4">
                        Meet Your Instructor
                      </h2>
                      <div
                        className="card border-0 shadow-sm p-4 mx-auto"
                        style={{ maxWidth: "500px" }}
                      >
                        <h5 className="mb-1">{course.tutor}</h5>
                        <p className="text-muted">Instructor</p>
                        <p className="text-dark">
                          An experienced professional who will guide you
                          step-by-step through this course.
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
