import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Cart/MainProvider";

export default function HomePopularCourses() {
  const [selectedCourse, setSelectedCourse] = useState(
    "Full Stack Development"
  );
  const { setVisible } = useContext(MainContext);

  const handleCourseSelect = (courseName) => {
    setSelectedCourse(courseName);
  };
  // function Handler(){
  const para1 = useRef();
  const para2 = useRef();
  const para3 = useRef();
  const para31 = useRef();
  const para32 = useRef();
  const para33 = useRef();
  // const para41 = useRef()
  // const para42 = useRef()
  // const para43 = useRef()

  const head1 = useRef();
  const head2 = useRef();
  const head3 = useRef();
  const head31 = useRef();
  const head32 = useRef();
  const head33 = useRef();
  // const head41 = useRef()
  // const head42 = useRef()
  // const head43 = useRef()

  useEffect(() => {
    (para1.current.style.display = " block"),
      (para2.current.style.display = " none"),
      (para3.current.style.display = "none"),
      (para31.current.style.display = "block"),
      (para32.current.style.display = "none"),
      (para33.current.style.display = "none"),
      // para41.current.style.display = 'block',
      // para42.current.style.display = 'none',
      // para43.current.style.display = 'none',

      (head1.current.style.display = "block"),
      (head2.current.style.display = "none"),
      (head3.current.style.display = "none");
    head31.current.style.display = "block";
    head32.current.style.display = "none";
    head33.current.style.display = "none";
    // head41.current.style.display = 'block'
    // head42.current.style.display = 'none'
    // head43.current.style.display = 'none'
  }, []);
  // }
  return (
    <>
      <section className="popular-courses-enhanced position-relative overflow-hidden py-5">
        {/* <!-- SVG decoration --> */}
        <figure className="position-absolute bottom-0 end-0 mb-n5">
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
            <path
              className="fill-warning"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            ></path>
          </svg>
        </figure>
        {/* <!-- SVG decoration --> */}
        <figure className="position-absolute top-0 start-0 mt-n8 me-5 d-none d-lg-block">
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
            <path
              className="fill-purple opacity-3"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            ></path>
          </svg>
        </figure>

        <div className="container position-relative popular-courses-content">
          {/* <!-- Title --> */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="fw-bold letskillify-title">
                <span className="position-relative z-index-9">
                  Most Popular{" "}
                </span>
                <span className="position-relative z-index-1">
                  Courses
                  {/* <!-- SVG START --> */}
                  <span className="position-absolute top-50 start-50 translate-middle z-index-n1">
                    <svg width="163.9px" height="48.6px">
                      {/* <path className="fill-warning" d="M162.5,19.9c-0.1-0.4-0.2-0.8-0.3-1.3c-0.1-0.3-0.2-0.5-0.4-0.7c-0.3-0.4-0.7-0.7-1.2-0.9l0.1,0l-0.1,0 c0.1-0.4-0.2-0.5-0.5-0.6c0,0-0.1,0-0.1,0c-0.1-0.1-0.2-0.2-0.3-0.3c0-0.3,0-0.6-0.2-0.7c-0.1-0.1-0.3-0.2-0.6-0.2 c0-0.3-0.1-0.5-0.3-0.6c-0.1-0.1-0.3-0.2-0.5-0.2c-0.1,0-0.1,0-0.2,0c-0.5-0.4-1-0.8-1.4-1.1c0,0,0-0.1,0-0.1c0-0.1-0.1-0.1-0.3-0.2 c-0.9-0.5-1.8-1-2.6-1.5c-6-3.6-13.2-4.3-19.8-6.2c-4.1-1.2-8.4-1.4-12.6-2c-5.6-0.8-11.3-0.6-16.9-1.1c-2.3-0.2-4.6-0.3-6.8-0.3 c-1.2,0-2.4-0.2-3.5-0.1c-2.4,0.4-4.9,0.6-7.4,0.7c-0.8,0-1.7,0.1-2.5,0.1c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0 c-0.9,0-1.8,0.1-2.7,0.1c-0.9,0-1.8,0-2.7,0c-5.5-0.3-10.7,0.7-16,1.5c-2.5,0.4-5.1,1-7.6,1.5c-2.8,0.6-5.6,0.7-8.4,1.4 c-4.1,1-8.2,1.9-12.3,2.6c-4,0.7-8,1.6-11.9,2.7c-3.6,1-6.9,2.5-10.1,4.1c-1.9,0.9-3.8,1.7-5.2,3.2c-1.7,1.8-2.8,4-4.2,6 c-1,1.3-0.7,2.5,0.2,3.9c2,3.1,5.5,4.4,9,5.7c1.8,0.7,3.6,1,5.3,1.8c2.3,1.1,4.6,2.3,7.1,3.2c5.2,2,10.6,3.4,16.2,4.4 c3,0.6,6.2,0.9,9.2,1.1c4.8,0.3,9.5,1.1,14.3,0.8c0.3,0.3,0.6,0.3,0.9-0.1c0.7-0.3,1.4,0.1,2.1-0.1c3.7-0.6,7.6-0.3,11.3-0.3 c2.1,0,4.3,0.3,6.4,0.2c4-0.2,8-0.4,11.9-0.8c5.4-0.5,10.9-1,16.2-2.2c0.1,0.2,0.2,0.1,0.2,0c0.5-0.1,1-0.2,1.4-0.3 c0.1,0.1,0.2,0.1,0.3,0c0.5-0.1,1-0.3,1.6-0.3c3.3-0.3,6.7-0.6,10-1c2.1-0.3,4.1-0.8,6.2-1.2c0.2,0.1,0.3,0.1,0.4,0.1 c0.1,0,0.1,0,0.2-0.1c0,0,0.1,0,0.1-0.1c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.2 c0,0,0,0,0,0l0,0c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.1c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0c0.2,0,0.3-0.1,0.3-0.3c0.5-0.2,0.9-0.4,1.4-0.5 c0.1,0,0.2,0,0.2,0c0,0,0.1,0,0.1,0c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0.2,0.1,0.4,0.1,0.6,0 c0.1,0,0.1-0.1,0.2-0.2c0.1-0.1,0.1-0.2,0.1-0.3c0.5-0.2,1-0.4,1.6-0.7c1.5-0.7,3.1-1.4,4.7-1.9c4.8-1.5,9.1-3.4,12.8-6.3 c0.8-0.2,1.2-0.5,1.6-1c0.2-0.3,0.4-0.6,0.5-0.9c0.5-0.1,0.7-0.2,0.9-0.5c0.2-0.2,0.2-0.5,0.3-0.9c0-0.1,0-0.1,0.1-0.1 c0.5,0,0.6-0.3,0.8-0.5C162.3,24,163,22,162.5,19.9z M4.4,28.7c-0.2-0.4-0.3-0.9-0.1-1.2c1.8-2.9,3.4-6,6.8-8 c2.8-1.7,5.9-2.9,8.9-4.2c4.3-1.8,9-2.5,13.6-3.4c0,0.1,0,0.2,0,0.2l0,0c-1.1,0.4-2.2,0.7-3.2,1.1c-3.3,1.1-6.5,2.1-9.7,3.4 c-4.2,1.6-7.6,4.2-10.1,7.5c-0.5,0.7-1,1.3-1.6,2c-2.2,2.7-1,4.7,1.2,6.9c0.1,0.1,0.3,0.3,0.4,0.5C7.8,32.5,5.5,31.2,4.4,28.7z  M158.2,23.8c-1.7,2.8-4.1,5.1-7,6.8c-2,1.2-4.5,2.1-6.9,2.9c-3.3,1-6.4,2.4-9.5,3.7c-3.9,1.6-8.1,2.5-12.4,2.9 c-6,0.5-11.8,1.5-17.6,2.5c-4.8,0.8-9.8,1-14.7,1.5c-5.6,0.6-11.2,0.2-16.8,0.1c-3.1-0.1-6.3,0.3-9.4,0.5c-2.6,0.2-5.2,0.1-7.8-0.1 c-3.9-0.3-7.8-0.5-11.7-0.9c-2.8-0.3-5.5-0.7-8.2-1.4c-3.2-0.8-6.3-1.7-9.5-2.5c-0.5-0.1-1-0.3-1.4-0.5c-0.2-0.1-0.4-0.1-0.6-0.2 c0,0,0.1,0,0.1,0c0.3-0.1,0.5,0,0.7,0.1c0,0,0,0,0,0c3.4,0.5,6.9,1.2,10.3,1.4c0.5,0,1,0,1.5,0c0.5,0,1.3,0.2,1.3-0.3 c0-0.6-0.7-0.9-1.4-0.9c-2.1,0-4.2-0.2-6.3-0.5c-4.6-0.7-9.1-1.5-13.4-3c-2.9-1.1-5.4-2.7-6.9-5.2c-0.5-0.8-0.5-1.6-0.1-2.4 c3.2-6.2,9-9.8,16.3-12.2c6.7-2.2,13.2-4.5,20.2-6c5-1.1,10-1.8,15-2.9c8.5-1.9,17.2-2.4,26-2.7c3.6-0.1,7.1-0.8,10.8-0.6 c8.4,0.7,16.7,1.2,25,2.3c4.5,0.6,9,1.2,13.6,1.7c3.6,0.4,7.1,1.4,10.5,2.8c3.1,1.3,6,2.9,8.5,5C159.1,17.7,159.8,21.1,158.2,23.8z" /> */}
                    </svg>
                  </span>
                  {/* <!-- SVG END --> */}
                </span>
              </h2>
              <p className="mb-0">
                See what course other students and experts in your domain are
                learning on.
              </p>
            </div>
          </div>

          {/* <!-- Outer tabs START --> */}
          <ul
            className="nav nav-pills nav-pill-soft mb-3"
            id="course-pills-tab"
            role="tablist"
          >
            {/* <!-- Tab item --> */}
            <li className="nav-item me-2 me-sm-5" role="presentation">
              <button
                className="nav-link active course-tab-enhanced"
                id="course-pills-tab-1"
                data-bs-toggle="pill"
                data-bs-target="#course-pills-tab1"
                type="button"
                role="tab"
                aria-controls="course-pills-tab1"
                aria-selected="true"
              >
                Full Stack Development
              </button>
            </li>
            {/* <!-- Tab item --> */}
            <li className="nav-item me-2 me-sm-5" role="presentation">
              <button
                className="nav-link course-tab-enhanced"
                id="course-pills-tab-2"
                data-bs-toggle="pill"
                data-bs-target="#course-pills-tab2"
                type="button"
                role="tab"
                aria-controls="course-pills-tab2"
                aria-selected="false"
              >
                Mern Stack Development
              </button>
            </li>
            {/* <!-- Tab item --> */}
            <li className="nav-item me-2 me-sm-5" role="presentation">
              <button
                className="nav-link course-tab-enhanced"
                id="course-pills-tab-3"
                data-bs-toggle="pill"
                data-bs-target="#course-pills-tab3"
                type="button"
                role="tab"
                aria-controls="course-pills-tab3"
                aria-selected="false"
              >
                Mean Stack Development
              </button>
            </li>
            {/* <!-- Tab item --> */}
            <li className="nav-item me-2 me-sm-5" role="presentation">
              <button
                className="nav-link course-tab-enhanced"
                id="course-pills-tab-4"
                data-bs-toggle="pill"
                data-bs-target="#course-pills-tab4"
                type="button"
                role="tab"
                aria-controls="course-pills-tab4"
                aria-selected="false"
              >
                Digital Marketing
              </button>
            </li>
            {/* <!-- Tab item --> */}
            <li className="nav-item me-2 me-sm-5" role="presentation">
              <button
                className="nav-link course-tab-enhanced"
                id="course-pills-tab-5"
                data-bs-toggle="pill"
                data-bs-target="#course-pills-tab5"
                type="button"
                role="tab"
                aria-controls="course-pills-tab5"
                aria-selected="false"
              >
                Finance
              </button>
            </li>
          </ul>

          <li
            className="nav-item dropdown mb-3 mobile"
            style={{ listStyle: "none" }}
          >
            <Link
              className="nav-link dropdown-toggle border p-2 rounded drop"
              to="/about"
              id="pagesMenu"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedCourse}
            </Link>
            <ul
              className="dropdown-menu w-100 border p-0"
              aria-labelledby="pagesMenu"
              id="course-pills-tab"
              role="tablist"
            >
              <li
                className="nav-item  p-2  border-bottom mb-1"
                role="presentation"
                onClick={() => handleCourseSelect("Full Stack Development")}
              >
                <button
                  className="nav-link active"
                  id="course-pills-tab-1"
                  data-bs-toggle="pill"
                  data-bs-target="#course-pills-tab1"
                  type="button"
                  role="tab"
                  aria-controls="course-pills-tab1"
                  aria-selected="true"
                >
                  Full Stack Development
                </button>
              </li>
              <li
                className="nav-item  p-2  border-bottom mb-1"
                role="presentation"
                onClick={() => handleCourseSelect("Mern Stack Development")}
              >
                <button
                  className="nav-link"
                  id="course-pills-tab-2"
                  data-bs-toggle="pill"
                  data-bs-target="#course-pills-tab2"
                  type="button"
                  role="tab"
                  aria-controls="course-pills-tab2"
                  aria-selected="false"
                >
                  Mern Stack Development
                </button>
              </li>
              <li
                className="nav-item  p-2  border-bottom mb-1"
                role="presentation"
                onClick={() => handleCourseSelect("Mean Stack Development")}
              >
                <button
                  className="nav-link"
                  id="course-pills-tab-3"
                  data-bs-toggle="pill"
                  data-bs-target="#course-pills-tab3"
                  type="button"
                  role="tab"
                  aria-controls="course-pills-tab3"
                  aria-selected="false"
                >
                  Mean Stack Development
                </button>
              </li>
              <li
                className="nav-item  p-2  border-bottom mb-1"
                role="presentation"
                onClick={() => handleCourseSelect("Digital Marketing")}
              >
                <button
                  className="nav-link"
                  id="course-pills-tab-4"
                  data-bs-toggle="pill"
                  data-bs-target="#course-pills-tab4"
                  type="button"
                  role="tab"
                  aria-controls="course-pills-tab4"
                  aria-selected="false"
                >
                  Digital Marketing
                </button>
              </li>
              <li
                className="nav-item  p-2 "
                role="presentation"
                onClick={() => handleCourseSelect("Finance")}
              >
                <button
                  className="nav-link"
                  id="course-pills-tab-5"
                  data-bs-toggle="pill"
                  data-bs-target="#course-pills-tab5"
                  type="button"
                  role="tab"
                  aria-controls="course-pills-tab5"
                  aria-selected="false"
                >
                  Finance
                </button>
              </li>
            </ul>
          </li>
          {/* <!-- Outer tabs END --> */}

          {/* <!-- Outer tabs contents START --> */}
          <div className="tab-content mb-0 mt-3" id="course-pills-tabContent">
            {/* <!-- Outer content START --> */}
            <div
              className="tab-pane fade show active"
              id="course-pills-tab1"
              role="tabpanel"
              aria-labelledby="course-pills-tab-1"
            >
              <div className="row">
                <div className="col-12">
                  <div className="row justify-content-between">
                    {/* <!-- Left content START --> */}
                    <div className="col-lg-6">
                      {/* <!-- Title --> */}
                      <h3 ref={head1}>Python Development</h3>
                      <h3 ref={head2}>Node.js Development</h3>
                      <h3 ref={head3}>Laravel Development</h3>
                      <p ref={para1} className="mb-3">
                        Python is a versatile and widely-used language that is
                        high-level, interpreted, interactive, object-oriented,
                        and open-source. It is primarily suited for software
                        development. To excel in Python programming, students
                        should possess basic programming knowledge, analytical
                        skills, and a willingness to learn. Key qualities for
                        success include patience, attention to detail, and a
                        strong foundation in problem-solving.
                      </p>
                      <p ref={para2} className="mb-3">
                        Node.js is a JavaScript runtime environment that helps
                        developers build fast and scalable server-side
                        applications. It has an event-driven and non-blocking
                        I/O model, making it efficient for high-traffic web
                        applications. Node.js also supports real-time data
                        processing and IoT applications, making it a popular
                        choice for building data-intensive applications.
                      </p>
                      <p ref={para3} className="mb-3">
                        Laravel is a free and open-source PHP framework that
                        helps developers build strong and scalable web
                        applications. It has a modular design, making it easy to
                        build and deploy web applications quickly. Laravel also
                        offers robust security features to protect web
                        applications from cyber threats.
                      </p>

                      {/* <!-- Inner tabs START --> */}
                      <ul
                        className="nav nav-pills nav-pill-dark-soft mb-0"
                        id="course-pills-tab-inner"
                        role="tablist"
                      >
                        {/* <!-- Tab item --> */}
                        <li
                          className="nav-item me-2 me-sm-3"
                          role="presentation"
                        >
                          <button
                            className="nav-link active"
                            id="course-pills-tab-01"
                            data-bs-toggle="pill"
                            data-bs-target="#course-pills-tab01"
                            type="button"
                            role="tab"
                            aria-controls="course-pills-tab01"
                            aria-selected="true"
                            onClick={() =>
                              (para1.current.style.display = "block") &&
                              (head1.current.style.display = "block")
                                ? (para2.current.style.display = "none") &&
                                  (para3.current.style.display = "none") &&
                                  (head2.current.style.display = "none") &&
                                  (head3.current.style.display = "none")
                                : null
                            }
                          >
                            Python
                          </button>
                        </li>
                        {/* <!-- Tab item --> */}
                        <li
                          className="nav-item me-2 me-sm-3"
                          role="presentation"
                        >
                          <button
                            className="nav-link"
                            id="course-pills-tab-02"
                            data-bs-toggle="pill"
                            data-bs-target="#course-pills-tab02"
                            type="button"
                            role="tab"
                            aria-controls="course-pills-tab02"
                            aria-selected="false"
                            onClick={() =>
                              (para2.current.style.display = "block") &&
                              (head2.current.style.display = "block")
                                ? (para1.current.style.display = "none") &&
                                  (para3.current.style.display = "none") &&
                                  (head1.current.style.display = "none") &&
                                  (head3.current.style.display = "none")
                                : null
                            }
                          >
                            Node.js
                          </button>
                        </li>
                        {/* <!-- Tab item --> */}
                        <li
                          className="nav-item me-2 me-sm-3"
                          role="presentation"
                        >
                          <button
                            className="nav-link"
                            id="course-pills-tab-03"
                            data-bs-toggle="pill"
                            data-bs-target="#course-pills-tab03"
                            type="button"
                            role="tab"
                            aria-controls="course-pills-tab03"
                            aria-selected="false"
                            onClick={() =>
                              (para3.current.style.display = "block") &&
                              (head3.current.style.display = "block")
                                ? (para1.current.style.display = "none") &&
                                  (para2.current.style.display = "none") &&
                                  (head2.current.style.display = "none") &&
                                  (head1.current.style.display = "none")
                                : null
                            }
                          >
                            Laravel
                          </button>
                        </li>
                      </ul>
                      {/* <!-- Inner tabs END --> */}

                      {/* <!-- Rating --> */}
                      <div className="d-flex align-items-center mb-3">
                        <h2 className="me-3 mb-0">4.5</h2>
                        <div>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item me-0 small">
                              <i className="fas fa-star text-warning"></i>
                            </li>
                            <li className="list-inline-item me-0 small">
                              <i className="fas fa-star text-warning"></i>
                            </li>
                            <li className="list-inline-item me-0 small">
                              <i className="fas fa-star text-warning"></i>
                            </li>
                            <li className="list-inline-item me-0 small">
                              <i className="fas fa-star text-warning"></i>
                            </li>
                            <li className="list-inline-item me-0 small">
                              <i className="fas fa-star-half-alt text-warning"></i>
                            </li>
                          </ul>
                          <p className="mb-0">Review from our students</p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Left content END --> */}

                    {/* <!-- Right content START --> */}
                    <div className="col-lg-6 position-relative">
                      {/* <!-- SVG decoration --> */}
                      <figure className="position-absolute top-0 start-100 translate-middle z-index-1 mt-5 pt-5 ms-3 d-none d-md-block">
                        <svg>
                          <path
                            className="fill-primary"
                            d="m105.32 16.607c-3.262 5.822-12.294 0.748-9.037-5.064 3.262-5.821 12.294-0.747 9.037 5.064zm-6.865 21.74c-5.481 9.779-20.654 1.255-15.182-8.509 5.48-9.779 20.653-1.255 15.182 8.509zm-36.466-11.481c6.134-10.943 23.113-1.404 16.99 9.522-6.133 10.943-23.113 1.404-16.99-9.522zm5.08-24.019c3.002-5.355 11.311-0.687 8.314 4.66-3.001 5.355-11.31 0.687-8.314-4.66zm-4.357 58.171c6.507-0.155 10.785 7.113 7.628 12.746-3.156 5.634-11.589 5.779-14.853 0.148-0.108-0.186-0.215-0.371-0.322-0.556-3.091-5.332 0.744-12.175 6.905-12.322 0.214-5e-3 0.428-0.011 0.642-0.016zm-14.997-8.34c-2.57 0.843-5.367 0.264-7.715-0.917-2.262-1.137-4.134-3.706-4.81-6.102-0.706-2.505-0.358-5.443 0.914-7.712 1.344-2.399 3.54-3.965 6.101-4.806 2.571-0.843 5.368-0.263 7.715 0.917 2.262 1.138 4.134 3.706 4.81 6.102 0.706 2.506 0.358 5.444-0.913 7.713-1.345 2.398-3.541 3.965-6.102 4.805zm-4.824-41.632c3.915-6.985 14.753-0.896 10.845 6.078-3.915 6.985-14.753 0.896-10.845-6.078zm-11.502 89.749c-1.138 1.37-3.658 2.357-5.408 2.314-1.387-0.035-2.719-0.374-3.958-0.997-1.529-0.769-2.655-2.243-3.307-3.773-0.615-1.445-0.989-3.345-0.459-4.903 0.039-0.113 0.077-0.227 0.116-0.341 0.929-2.724 2.63-4.878 5.509-5.688 1.943-0.547 4.222-0.276 5.984 0.711 1.861 1.043 3.077 2.746 3.729 4.732 0.922 2.805-0.2 5.531-1.976 7.668-0.077 0.093-0.153 0.185-0.23 0.277zm-7.657-31.402c2.806-5.006 10.573-0.642 7.772 4.356-2.806 5.006-10.573 0.642-7.772-4.356zm-3.281-18.47c3.262-5.821 12.294-0.747 9.037 5.065-3.262 5.821-12.294 0.747-9.037-5.065zm-4.63-25.623c3.849-6.869 14.506-0.881 10.663 5.976-3.849 6.869-14.507 0.882-10.663-5.976zm-0.416 16.398c-3.785 6.753-14.261 0.867-10.483-5.874 3.784-6.753 14.261-0.867 10.483 5.874zm-6.41 13.04c-2.871 5.122-10.819 0.657-7.953-4.457 2.871-5.123 10.819-0.658 7.953 4.457zm3.665 16.114c2.701 1.359 3.576 5.061 2.147 7.612-1.533 2.735-4.903 3.506-7.613 2.143-2.702-1.359-3.577-5.061-2.147-7.612 1.532-2.735 4.903-3.506 7.613-2.143zm6.319 39.375c-2.936 5.239-11.064 0.673-8.133-4.558 2.936-5.239 11.064-0.672 8.133 4.558zm30.789-17.287c-3.98 7.101-14.998 0.911-11.025-6.179 3.98-7.102 14.998-0.912 11.025 6.179zm7.01 23.118c-5.807 10.362-21.883 1.33-16.086-9.015 5.807-10.361 21.884-1.329 16.086 9.015z"
                            fill="#f00"
                            fillfule="evenodd"
                          />
                        </svg>
                      </figure>

                      {/* <!-- Inner tab content START --> */}
                      <div
                        className="tab-content mb-0 pb-0"
                        id="course-pills-tabContent1"
                      >
                        {/* <!-- Inner content item START --> */}
                        <div
                          className="tab-pane fade show active"
                          id="course-pills-tab01"
                          role="tabpanel"
                          aria-labelledby="course-pills-tab-01"
                        >
                          {/* <!-- Card START --> */}
                          <div className="card p-2 pb-0 shadow">
                            <div className="overflow-hidden h-xl-200px">
                              <img
                                src="./assets/images/about/13.jpg"
                                className="card-img-top"
                                alt="course image"
                                onError={(e) => {
                                  e.target.src = "/assets/images/default.jpeg";
                                }}
                              />
                              <div className="card-img-overlay d-flex p-3">
                                {/* <!-- Video button and link --> */}
                                <div className="m-auto">
                                  <a
                                    href="https://www.youtube.com/embed/tXHviS-4ygo"
                                    className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                                    data-glightbox=""
                                    data-gallery="course-video"
                                  >
                                    <i className="fas fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            {/* <!-- Card body --> */}
                            <div className="card-body py-0">
                              <ul className="list-inline pe-0 mt-4 mb-3 d-flex justify-content-center">
                                <Link onClick={() => setVisible(true)} className="course-btn-enhanced flex-fill text-center">
                                  Enquire now
                                </Link>
                                <Link
                                  to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                                  className="course-btn-enhanced course-btn-secondary flex-fill ms-2 text-center"
                                >
                                  Call Now
                                </Link>
                              </ul>
                            </div>
                          </div>
                          {/* <!-- Card END --> */}
                        </div>
                        {/* <!-- Inner content item END --> */}

                        {/* <!-- Inner content item START --> */}
                        <div
                          className="tab-pane fade"
                          id="course-pills-tab02"
                          role="tabpanel"
                          aria-labelledby="course-pills-tab-02"
                        >
                          {/* <!-- Card START --> */}
                          <div className="card p-2 pb-0 shadow">
                            <div className="overflow-hidden h-xl-200px">
                              <img
                                src="./assets/images/about/11.jpg"
                                className="card-img-top"
                                alt="course image"
                                onError={(e) => {
                                  e.target.src = "/assets/images/default.jpeg";
                                }}
                              />
                              <div className="card-img-overlay d-flex p-3">
                                {/* <!-- Video button and link --> */}
                                <div className="m-auto">
                                  <a
                                    href="https://www.youtube.com/embed/tXHviS-4ygo"
                                    className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                                    data-glightbox=""
                                    data-gallery="course-video"
                                  >
                                    <i className="fas fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            {/* <!-- Card body --> */}
                            <div className="card-body py-0">
                              <ul className="list-inline pe-0 mt-4 mb-3 d-flex justify-content-center">
                                <Link onClick={() => setVisible(true)} className="course-btn-enhanced flex-fill text-center">
                                  Enquire now
                                </Link>
                                <Link
                                  to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                                  className="course-btn-enhanced course-btn-secondary flex-fill ms-2 text-center"
                                >
                                  Call Now
                                </Link>
                              </ul>
                            </div>
                          </div>
                          {/* <!-- Card END --> */}
                        </div>
                        {/* <!-- Inner content item END --> */}

                        {/* <!-- Inner content item START --> */}
                        <div
                          className="tab-pane fade"
                          id="course-pills-tab03"
                          role="tabpanel"
                          aria-labelledby="course-pills-tab-03"
                        >
                          {/* <!-- Card START --> */}
                          <div className="card p-2 shadow">
                            <div className="overflow-hidden h-xl-200px">
                              <img
                                src="./assets/images/about/14.jpg"
                                className="card-img-top"
                                alt="course image"
                                onError={(e) => {
                                  e.target.src = "/assets/images/default.jpeg";
                                }}
                              />
                              <div className="card-img-overlay d-flex p-3">
                                {/* <!-- Video button and link --> */}
                                <div className="m-auto">
                                  <a
                                    href="https://www.youtube.com/embed/tXHviS-4ygo"
                                    className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                                    data-glightbox=""
                                    data-gallery="course-video"
                                  >
                                    <i className="fas fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            {/* <!-- Card body --> */}
                            <div className="card-body py-0">
                              <ul className="list-inline pe-0 mt-4 mb-3 d-flex justify-content-center">
                                <Link onClick={() => setVisible(true)} className="course-btn-enhanced flex-fill text-center">
                                  Enquire now
                                </Link>
                                <Link
                                  to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                                  className="course-btn-enhanced course-btn-secondary flex-fill ms-2 text-center"
                                >
                                  Call Now
                                </Link>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* <!-- Inner content item END --> */}
                      </div>
                      {/* <!-- Inner tab content END --> */}
                    </div>
                    {/* <!-- Right content END --> */}
                  </div>
                </div>
              </div>
              {/*  <!-- Row END --> */}
            </div>
            {/* <!-- Outer content END --> */}

            {/* <!-- Outer content START --> */}
            <div
              className="tab-pane fade"
              id="course-pills-tab2"
              role="tabpanel"
              aria-labelledby="course-pills-tab-2"
            >
              <div className="row">
                {/* <!-- Left content START --> */}
                <div className="col-lg-6">
                  {/* <!-- Title --> */}
                  <h3>MERN Development</h3>
                  <p className="mb-3">
                    You will learn both front-end and back-end development, with
                    a strong focus on mastering JavaScript and React for the
                    front-end and Node.js, Express.js, and MongoDB for the
                    back-end. The course also includes internships to gain
                    hands-on experience and develop a strong portfolio by the
                    end.
                  </p>
                  <h6 className="mt-4">What you’ll learn</h6>
                  <ul className="list-group list-group-borderless mb-3">
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Introduction to HTML, CSS & JS
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      1-Month Internship in HTML, CSS & JS{" "}
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      React + ES6
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Node JS + Express JS
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      MongoDB & SQL + MySQL
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Multiple Projects
                    </li>
                  </ul>
                </div>
                {/* <!-- Left content END --> */}

                {/* <!-- Right content START --> */}
                <div className="col-lg-6">
                  {/* <!-- Card START --> */}
                  <div className="card p-2 pb-0 shadow">
                    <div className="overflow-hidden h-xl-200px">
                      <img
                        src="./assets/images/about/14.jpg"
                        className="card-img-top"
                        alt="course image"
                        onError={(e) => {
                          e.target.src = "/assets/images/default.jpeg";
                        }}
                      />
                      <div className="card-img-overlay d-flex p-3">
                        {/* <!-- Video button and link --> */}
                        <div className="m-auto">
                          <a
                            href="https://www.youtube.com/embed/tXHviS-4ygo"
                            className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                            data-glightbox=""
                            data-gallery="course-video"
                          >
                            <i className="fas fa-play"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Card body --> */}
                    <div className="card-body py-0">
                      <ul className="list-inline pe-0 mt-4 mb-3 d-flex justify-content-center">
                        <Link onClick={() => setVisible(true)} className="course-btn-enhanced flex-fill text-center">
                          Enquire now
                        </Link>
                        <Link
                          to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                          className="course-btn-enhanced course-btn-secondary flex-fill ms-2 text-center"
                        >
                          Call Now
                        </Link>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- Card END --> */}
                </div>
                {/* <!-- Right content END --> */}
                {/* </div> <!-- Row END --> */}
              </div>
              {/* <!-- Outer content END --> */}
            </div>
            {/* <!-- Outer tabs contents END --> */}

            {/* <!-- Outer content START --> */}
            <div
              className="tab-pane fade"
              id="course-pills-tab3"
              role="tabpanel"
              aria-labelledby="course-pills-tab-3"
            >
              <div className="row g-4">
                {/* <!-- Left content START --> */}
                <div className="col-lg-6">
                  {/* <!-- Title --> */}
                  <h3>MEAN Development</h3>
                  <p className="mb-3">
                    {" "}
                    You will learn everything from front-end development using
                    HTML, CSS, and Angular, to back-end development with
                    Node.js, Express.js, and MongoDB. The course structure
                    includes internships to provide you with real-world
                    experience, allowing you to build a robust portfolio by the
                    end of the program.
                  </p>
                  <h6 className="mt-4">What you’ll learn</h6>
                  <ul className="list-group list-group-borderless mb-3">
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Introduction to HTML, CSS & JS
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      1-Month Internship in HTML, CSS & JS{" "}
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Angular + TypeScript
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Node JS + Express JS
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      MongoDB & SQL + MySQL
                    </li>
                    <li className="list-group-item h6 fw-light d-flex mb-0">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>
                      Multiple Projects
                    </li>
                  </ul>
                </div>
                {/* <!-- Left content END --> */}

                {/* <!-- Right content START --> */}
                <div className="col-lg-6">
                  {/* <!-- Card START --> */}
                  <div className="card p-2 shadow">
                    <div className="overflow-hidden rounded-3 h-xl-200px">
                      <img
                        src="./assets/images/about/15.jpg"
                        className="card-img rounded-3"
                        alt="course image"
                        onError={(e) => {
                          e.target.src = "/assets/images/default.jpeg";
                        }}
                      />
                      <div className="card-img-overlay d-flex p-3">
                        {/* <!-- Video button and link --> */}
                        <div className="m-auto">
                          <a
                            href="https://www.youtube.com/embed/tXHviS-4ygo"
                            className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                            data-glightbox=""
                            data-gallery="course-video"
                          >
                            <i className="fas fa-play"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body py-0">
                      <ul className="list-inline pe-0 mt-4 mb-3 d-flex justify-content-center">
                        <Link onClick={() => setVisible(true)} className="course-btn-enhanced flex-fill text-center">
                          Enquire now
                        </Link>
                        <Link
                          to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                          className="course-btn-enhanced course-btn-secondary flex-fill ms-2 text-center"
                        >
                          Call Now
                        </Link>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- Card END --> */}
                </div>
                {/* <!-- Right content END --> */}
              </div>
            </div>
            {/* <!-- Outer content END --> */}

            {/* <!-- Outer content START --> */}
            <div
              className="tab-pane fade"
              id="course-pills-tab4"
              role="tabpanel"
              aria-labelledby="course-pills-tab-4"
            >
              <div className="row g-4">
                {/* <!-- Left content START --> */}
                <div className="col-lg-6">
                  {/* <!-- Title --> */}
                  <h3 ref={head31}>SEO (Search Engine Optimization)</h3>
                  <h3 ref={head32}>SMM (Social Media Marketing)</h3>
                  <h3 ref={head33}>Google Advertisement</h3>
                  <p ref={para31} className="mb-3">
                    Our comprehensive SEO (Search Engine Optimization) course is
                    designed to equip you with the skills needed to optimize
                    websites, drive organic traffic, and improve search engine
                    rankings. Whether you're a beginner or a marketing
                    professional, this course covers everything you need to
                    succeed in the ever-evolving digital landscape.
                  </p>
                  <p ref={para32} className="mb-3">
                    Our Social Media Marketing (SMM) course is designed to equip
                    you with the skills to effectively market brands on
                    platforms like Facebook, Instagram, Twitter, LinkedIn, and
                    more. Learn to create impactful content, run targeted ad
                    campaigns, and engage your audience to drive business
                    growth.
                  </p>
                  <p ref={para33} className="mb-3">
                    Google Ads is a powerful digital advertising platform that
                    allows businesses to create and manage online ads targeting
                    specific keywords and demographics. With Google Ads,
                    advertisers can place ads on Google’s search engine results
                    pages (SERPs) and on millions of websites within Google’s
                    Display Network, including mobile apps and YouTube.
                  </p>

                  {/* <!-- Inner tabs START --> */}
                  <ul
                    className="nav nav-pills nav-pill-dark-soft mb-0"
                    id="course-pills-tab-inner"
                    role="tablist"
                  >
                    {/* <!-- Tab item --> */}
                    <li className="nav-item me-2 me-sm-3" role="presentation">
                      <button
                        className="nav-link active"
                        id="course-pills-tab-01"
                        data-bs-toggle="pill"
                        data-bs-target="#course-pills-tab01"
                        type="button"
                        role="tab"
                        aria-controls="course-pills-tab01"
                        aria-selected="true"
                        onClick={() =>
                          (para31.current.style.display = "block") &&
                          (head31.current.style.display = "block")
                            ? (para32.current.style.display = "none") &&
                              (para33.current.style.display = "none") &&
                              (head32.current.style.display = "none") &&
                              (head33.current.style.display = "none")
                            : null
                        }
                      >
                        SEO
                      </button>
                    </li>
                    {/* <!-- Tab item --> */}
                    <li className="nav-item me-2 me-sm-3" role="presentation">
                      <button
                        className="nav-link"
                        id="course-pills-tab-02"
                        data-bs-toggle="pill"
                        data-bs-target="#course-pills-tab02"
                        type="button"
                        role="tab"
                        aria-controls="course-pills-tab02"
                        aria-selected="false"
                        onClick={() =>
                          (para32.current.style.display = "block") &&
                          (head32.current.style.display = "block")
                            ? (para31.current.style.display = "none") &&
                              (para33.current.style.display = "none") &&
                              (head31.current.style.display = "none") &&
                              (head33.current.style.display = "none")
                            : null
                        }
                      >
                        SMM
                      </button>
                    </li>
                    {/* <!-- Tab item --> */}
                    <li className="nav-item me-2 me-sm-3" role="presentation">
                      <button
                        className="nav-link"
                        id="course-pills-tab-03"
                        data-bs-toggle="pill"
                        data-bs-target="#course-pills-tab03"
                        type="button"
                        role="tab"
                        aria-controls="course-pills-tab03"
                        aria-selected="false"
                        onClick={() =>
                          (para33.current.style.display = "block") &&
                          (head33.current.style.display = "block")
                            ? (para31.current.style.display = "none") &&
                              (para32.current.style.display = "none") &&
                              (head32.current.style.display = "none") &&
                              (head31.current.style.display = "none")
                            : null
                        }
                      >
                        Google Ads
                      </button>
                    </li>
                  </ul>
                  {/* <!-- Inner tabs END --> */}

                  {/* <!-- Rating --> */}
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="me-3 mb-0">4.5</h2>
                    <div>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item me-0 small">
                          <i className="fas fa-star text-warning"></i>
                        </li>
                        <li className="list-inline-item me-0 small">
                          <i className="fas fa-star text-warning"></i>
                        </li>
                        <li className="list-inline-item me-0 small">
                          <i className="fas fa-star text-warning"></i>
                        </li>
                        <li className="list-inline-item me-0 small">
                          <i className="fas fa-star text-warning"></i>
                        </li>
                        <li className="list-inline-item me-0 small">
                          <i className="fas fa-star-half-alt text-warning"></i>
                        </li>
                      </ul>
                      <p className="mb-0">Review from our students</p>
                    </div>
                  </div>
                </div>
                {/* <!-- Left content END --> */}

                {/* <!-- Right content START --> */}
                <div className="col-lg-6">
                  {/* <!-- Card START --> */}
                  <div className="card p-2 shadow">
                    <div className="overflow-hidden rounded-3 h-xl-200px">
                      <img
                        src="./assets/images/about/12.jpg"
                        className="card-img rounded-3"
                        alt="course image"
                        onError={(e) => {
                          e.target.src = "/assets/images/default.jpeg";
                        }}
                      />
                      <div className="card-img-overlay d-flex p-3">
                        {/* <!-- Video button and link --> */}
                        <div className="m-auto">
                          <a
                            href="https://www.youtube.com/embed/tXHviS-4ygo"
                            className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                            data-glightbox=""
                            data-gallery="course-video"
                          >
                            <i className="fas fa-play"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body py-0">
                      <ul className="list-inline pe-0 mt-4 mb-3 d-flex justify-content-center">
                        <Link onClick={() => setVisible(true)} className="course-btn-enhanced flex-fill text-center">
                          Enquire now
                        </Link>
                        <Link
                          to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                          className="course-btn-enhanced course-btn-secondary flex-fill ms-2 text-center"
                        >
                          Call Now
                        </Link>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- Card END --> */}
                </div>
                {/* <!-- Right content END --> */}
              </div>
            </div>
            {/* <!-- Outer content END --> */}

            {/* <!-- Outer content START --> */}
            <div
              className="tab-pane fade"
              id="course-pills-tab5"
              role="tabpanel"
              aria-labelledby="course-pills-tab-5"
            >
              <div className="row g-4">
                {/* <!-- Left content START --> */}
                <h4 className="text-center">Pending...</h4>
                {/* <!-- Left content END --> */}

                {/* <!-- Right content START --> */}

                {/* <!-- Right content END --> */}
              </div>
            </div>
            {/* <!-- Outer content END --> */}

            {/* <!-- Mean Stack Development --> */}
          </div>
        </div>
      </section>
    </>
  );
}
