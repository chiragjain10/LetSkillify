import React, { useContext, useEffect, useRef, useState } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import courses from "./Json product/course-list";
import { MainContext } from "./Cart/MainProvider";
import RegisterForm from "./RegisterForm";
import SubNav from "./SubNav";
import { ChevronDown, Heart, MapPin, ShoppingBag } from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [showClass, setshowClass] = useState("");
  const [SubShowClass1, setSubShowClass1] = useState("");
  const [SubShowClass2, setSubShowClass2] = useState("");
  const [SubShowClass3, setSubShowClass3] = useState("");
  const [SubShowClass4, setSubShowClass4] = useState("");
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const navbarRef = useRef(null);
  const navbarcolloseRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdown1Ref = useRef(null);
  const dropdown2Ref = useRef(null);
  const dropdown3Ref = useRef(null);
  const location = useLocation();
  const loca = location.pathname;
  const [isShow, setIsShow] = useState(false);

  const { setVisible } = useContext(MainContext);

  useEffect(() => {
    const user = Cookies.get("cookies");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("Logincookie"); // Remove the user cookie
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {};

  const resetAllSubClasses = () => {
    setshowClass("");
    setSubShowClass1("");
    setSubShowClass2("");
    setSubShowClass3("");
    setSubShowClass4("");
  };
  let handlerClassAdd = () => {
    // resetAllSubClasses();
    if (showClass === "") {
      setshowClass("show");
    } else {
      setshowClass("");
    }
  };

  const handlerClassSubAdd1 = () => {
    // resetAllSubClasses();
    if (SubShowClass1 === "") {
      setSubShowClass1("show");
    } else {
      setSubShowClass1("");
    }
  };
  const handlerClassAdd2 = () => {
    // resetAllSubClasses();
    if (SubShowClass2 === "") {
      setSubShowClass2("show");
    } else {
      setSubShowClass2("");
    }
  };
  const handlerClassAdd3 = () => {
    // resetAllSubClasses();
    if (SubShowClass3 === "") {
      setSubShowClass3("show");
    } else {
      setSubShowClass3("");
    }
  };
  const handlerClassAdd4 = () => {
    // resetAllSubClasses();
    if (SubShowClass4 === "") {
      setSubShowClass4("show");
    } else {
      setSubShowClass4("");
    }
  };

  useEffect(() => {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(false);
      removeShowClass();
      AddCollapse();
    }

    resetAllSubClasses();
  }, [loca]);

  const removeShowClass = () => {
    if (navbarRef.current) {
      navbarRef.current.classList.remove("show");
    }
  };
  const AddCollapse = () => {
    if (navbarcolloseRef.current) {
      navbarcolloseRef.current.setAttribute("aria-expanded", "false"); // Set aria-expanded attribute
    }
  };

  useEffect(() => {
    if (
      dropdownRef.current &&
      dropdown1Ref.current &&
      dropdown2Ref.current &&
      dropdown3Ref.current
    ) {
      // Remove the 'dropdown' class
      dropdownRef.current.classList.remove("dropdown");
      dropdown1Ref.current.classList.remove("dropdown");
      dropdown2Ref.current.classList.remove("dropdown");
      dropdown3Ref.current.classList.remove("dropdown");

      // Add the class back after 1 second
      const timer = setTimeout(() => {
        dropdownRef.current.classList.add("dropdown");
        dropdown1Ref.current.classList.add("dropdown");
        dropdown2Ref.current.classList.add("dropdown");
        dropdown3Ref.current.classList.add("dropdown");
      }, 1000);

      // Cleanup the timer on unmount or route change
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <SubNav />
      <RegisterForm />
      <nav
        className={` navbar navbar-expand-xl  top-0 start-0 end-0 ${
          isScrolled ? "position-fixed shadow" : ""
        }`}
        style={{ zIndex: "99" }}
      >
        <div
          className={`container-fluid px-3 px-xl-5 ${
            isScrolled ? "py-1" : ""
          }`}
        >
          <Link to={"/"} className="navbar-brand p-1">
            <img
              className="light-mode-item navbar-brand-item custom-hidden mt-2 navbar-img"
              style={{ height: "auto" }}
              src="/assets/images/icon/ls-nav.png"
              alt="logo"
            />
          </Link>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`navbar-toggler ms-auto`}
            type="button"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-animation">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <div
            className={`collapse navbar-collapse ${open ? "show" : ""}`}
            id="navbarCollapse"
            ref={navbarRef}
          >
            <ul
              className="navbar-nav navbar-nav-scroll me-auto"
              style={{ marginLeft: "10px" }}
            >
              <li
                className="nav-item dropdown-menu-shadow-stacked dropdown"
                ref={dropdownRef}
              >
                <Link
                  className={`nav-link bg-primary bg-opacity-10 rounded-3 text-primary px-3 py-3 py-xl-0 ${
                    !showClass && !SubShowClass3 && !SubShowClass4
                  }`}
                  id="categoryMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={resetAllSubClasses}
                >
                  <i className="bi bi-ui-radios-grid me-2"></i>
                  <span>Category</span>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="categoryMenu">
                  <li className="dropdown-submenu dropend">
                    <Link
                      className={`dropdown-item dropdown-toggle ${showClass}`}
                      onClick={handlerClassAdd}
                    >
                      <span>Development</span>
                    </Link>
                    <ul
                      className={`dropdown-menu dropdown-menu-start ${showClass}`}
                      data-bs-popper="none"
                    >
                      <li className="dropdown-submenu dropend">
                        <Link
                          className={`dropdown-item dropdown-toggle  ${SubShowClass1}`}
                          onClick={handlerClassSubAdd1}
                        >
                          Full Stack
                        </Link>
                        <ul
                          className={`dropdown-menu  ${SubShowClass1}`}
                          data-bs-popper="none"
                        >
                          <li>
                            {" "}
                            <Link
                              to={"/courses/courseDetails/3"}
                              className="dropdown-item"
                            >
                              Python
                            </Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link
                              to={"/courses/courseDetails/5"}
                              className="dropdown-item"
                            >
                              Node Js
                            </Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link
                              to={"/courses/courseDetails/4"}
                              className="dropdown-item"
                            >
                              Laravel
                            </Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link
                              to={"/courses/courseDetails/7"}
                              className="dropdown-item"
                            >
                              React Js
                            </Link>{" "}
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/1"}
                          className="dropdown-item"
                        >
                          Mern Stack
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/2"}
                          className="dropdown-item"
                        >
                          Mean Stack
                        </Link>{" "}
                      </li>
                      <li className="dropdown-submenu dropend">
                        <Link
                          className={`dropdown-item dropdown-toggle ${SubShowClass2}`}
                          onClick={handlerClassAdd2}
                        >
                          Android App
                        </Link>
                        <ul
                          className={`dropdown-menu ${SubShowClass2}`}
                          data-bs-popper="none"
                        >
                          <li>
                            {" "}
                            <Link
                              to={"/courses/courseDetails/12"}
                              className="dropdown-item"
                            >
                              React Native
                            </Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link
                              to={"/courses/courseDetails/11"}
                              className="dropdown-item"
                            >
                              Flutter
                            </Link>{" "}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link
                      className={`dropdown-item dropdown-toggle  ${SubShowClass3}`}
                      onClick={handlerClassAdd3}
                    >
                      Graphic
                    </Link>
                    <ul
                      className={`dropdown-menu dropdown-menu-start  ${SubShowClass3}`}
                      data-bs-popper="none"
                    >
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/404"}
                          className="dropdown-item"
                        >
                          Figma
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/404"}
                          className="dropdown-item"
                        >
                          Photoshop
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/404"}
                          className="dropdown-item"
                        >
                          Illustrator
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/404"}
                          className="dropdown-item"
                        >
                          CorelDraw
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/courses/courseDetails/404"}
                          className="dropdown-item"
                        >
                          Indesign
                        </Link>{" "}
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu dropend">
                    <Link
                      className={`dropdown-item dropdown-toggle  ${SubShowClass4}`}
                      onClick={handlerClassAdd4}
                    >
                      Marketing
                    </Link>
                    <div
                      className={`dropdown-menu dropdown-menu-start dropdown-width-lg  ${SubShowClass4}`}
                      data-bs-popper="none"
                    >
                      <div className="row p-4">
                        <div className="col-xl-6 col-xxl-4 mb-4 mb-xl-0">
                          <h6 className="mb-0">SEO</h6>
                          <hr />

                          <ul className="list-unstyled">
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                Onpage
                              </Link>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                Offpage
                              </Link>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                Technical
                              </Link>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                Mobile
                              </Link>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                International
                              </Link>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                Google Analytics
                              </Link>{" "}
                            </li>
                            <li>
                              {" "}
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="dropdown-item"
                              >
                                Google ads
                              </Link>{" "}
                            </li>
                          </ul>
                        </div>

                        <div className="col-xl-6 col-xxl-4">
                          <h6 className="mb-0">Social Media Marketing</h6>
                          <hr />

                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fab fa-fw fa-facebook text-facebook"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                Facebook Marketing
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fab fa-fw fa-instagram text-instagram"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                Instagram
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fab fa-fw fa-twitter text-twitter"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                Twitter
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fab fa-fw fa-linkedin-in text-linkedin"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                Linkdin
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fas fa-fw fa-envelope text-linkedin"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                Email Marketing
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-xxl-4">
                          <h6 className="mb-0">Certificate</h6>
                          <hr />

                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fab fa-fw fa-google text-google-icon"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                Google Certificate
                              </Link>
                            </div>
                          </div>

                          <div className="d-flex mb-3 position-relative align-items-center">
                            <h2 className="mb-0" style={{ fontSize: "25px" }}>
                              <i className="fas fa-fw fa-globe"></i>
                            </h2>
                            <div className="ms-2">
                              <Link
                                to={"/courses/courseDetails/404"}
                                className="stretched-link h6 mb-0"
                              >
                                LetSkillify Certificate
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to={"/courses/courseDetails/404"}
                      className="dropdown-item"
                    >
                      Laws
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to={"/courses/courseDetails/404"}
                      className="dropdown-item"
                    >
                      Finance
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {" "}
                    <Link
                      to={"/courses"}
                      className="dropdown-item bg-primary text-primary bg-opacity-10 rounded-2 mb-0"
                    >
                      View all categories
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav navbar-nav-scroll me-auto">
              <li className="nav-item" >
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown " ref={dropdown1Ref}>
                <Link
                  className="nav-link dropdown"
                  to="/about"
                  id="pagesMenu"
                  // data-bs-toggle="dropdown"
                  // role="button"
                  // aria-expanded="false"
                >
                  About
                  <ChevronDown
                    className="ms-1 d-none d-md-inline"
                    size={15}
                    strokeWidth={4}
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                  <li className="dropdown-submenu dropend">
                    <Link to={"/founder"} className="dropdown-item">
                      Founder
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to={"/teammember"} className="dropdown-item">
                      Team Member
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to={"/certificate"} className="dropdown-item">
                      Certificate
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to={"/offering"} className="dropdown-item">
                      Our Offering
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to={"/feedbacks"} className="dropdown-item">
                      Feedbacks
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Small Screen  About Us */}
              <li
                className="nav-item dropdown d-lg-none d-md-block"
                ref={dropdown1Ref}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="pagesMenu"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  Company
                </a>
                <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                  <li className="dropdown-submenu dropend">
                    <Link to="/founder" className="dropdown-item">
                      Founder
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to="/teammember" className="dropdown-item">
                      Team Member
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to="/certificate" className="dropdown-item">
                      Certificate
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to="/offering" className="dropdown-item">
                      Our Offering
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to="/feedbacks" className="dropdown-item">
                      Feedbacks
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Small Screen  About Us */}

              <li className="nav-item dropdown" ref={dropdown2Ref}>
                <Link
                  className="nav-link dropdown-toggle"
                  id="accounntMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Products
                </Link>
                <ul className="dropdown-menu" aria-labelledby="accounntMenu">
                  <li className="dropdown-submenu dropend">
                    <Link to={"/products"} className="dropdown-item">
                      <i className="fas fa-shopping-cart fa-fw me-1"></i>
                      Products
                    </Link>
                  </li>

                  <li className="dropdown-submenu dropend">
                    <Link to={"/templates"} className="dropdown-item">
                      <i className="fas fa-file-alt fa-fw me-1"></i>Templates
                    </Link>
                  </li>
                </ul>
              </li>
              {/* 
              <li
                className="nav-item dropdown dropdown-fullwidth"
                ref={dropdown3Ref}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Courses
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  data-bs-popper="none"
                >
                  <div className="row p-4">
                    <div className="col-xl-6 col-xxl-3 mb-3">
                      <h6 className="mb-0">Courses</h6>
                      <hr />

                      <ul className="list-unstyled">
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/3"}
                            className="dropdown-item"
                          >
                            Python Development{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/5"}
                            className="dropdown-item"
                          >
                            Node Js Development{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/7"}
                            className="dropdown-item"
                          >
                            React Js Development{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/8"}
                            className="dropdown-item"
                          >
                            Angular Development{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"courses/courseDetails/4"}
                            className="dropdown-item"
                          >
                            Php+Laravel Development{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="dropdown-item"
                          >
                            Graphic (UI/UX){" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="dropdown-item"
                          >
                            Search Engine Optimization{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="dropdown-item"
                          >
                            Social Media Marketing{" "}
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="dropdown-item"
                          >
                            Google Ads{" "}
                          </Link>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="col-xl-6 col-xxl-3 mb-3">
                      <h6 className="mb-0">Packages</h6>
                      <hr />

                      <div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base px-3 py-1">
                        <Link
                          to={"/courses/courseDetails/3"}
                          className="stretched-link h6 mb-0"
                        >
                          Full Stack With Python
                        </Link>
                        <p>
                          The Full Stack Development Course - Master in Python
                        </p>
                      </div>

                      <div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base px-3 py-1">
                        <Link
                          to={"/courses/courseDetails/5"}
                          className="stretched-link h6 mb-0"
                        >
                          Full Stack With Node JS
                        </Link>
                        <p>
                          The Full Stack Development Course - Master in Node JS
                        </p>
                      </div>

                      <div className="position-relative bg-primary-soft-hover rounded-2 transition-base px-3 py-1">
                        <Link
                          to={"/courses/courseDetails/4"}
                          className="stretched-link h6 mb-0"
                        >
                          Full Stack With Laravel
                        </Link>
                        <p>
                          The Full Stack Development Course - Master in Laravel
                        </p>
                      </div>
                    </div>

                    <div className="col-xl-6 col-xxl-3">
                      <h6 className="mb-0">Certificate</h6>
                      <hr />

                      <div className="d-flex mb-3 position-relative align-items-center">
                        <h2 className="mb-0" style={{ fontSize: "25px" }}>
                          <i className="fab fa-fw fa-google text-google-icon"></i>
                        </h2>
                        <div className="ms-2">
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="stretched-link h6 mb-0"
                          >
                            Google Certificate
                          </Link>
                        </div>
                      </div>

                      <div className="d-flex mb-3 position-relative align-items-center">
                        <h2 className="mb-0" style={{ fontSize: "25px" }}>
                          <i className="fas fa-fw fa-globe"></i>
                        </h2>
                        <div className="ms-2">
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="stretched-link h6 mb-0"
                          >
                            LetSkillify Certificate
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex mb-3 position-relative align-items-center">
                        <h2 className="mb-0" style={{ fontSize: "25px" }}>
                          <i className="fas fa-building fa-fw me-1"></i>
                        </h2>
                        <div className="ms-2">
                          <Link
                            to={"/courses/courseDetails/404"}
                            className="stretched-link h6 mb-0"
                          >
                            Page3 Digital Certificate
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-xxl-3 my-5 ">
                      <img src="/images/element/14.svg" alt="" />
                    </div>
                  </div>
                </div>
              </li> */}

              <li className="nav-item" ref={dropdown3Ref}>
                <Link className="nav-link" to="/courses">
                  Courses
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="eventsMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Activities/Events
                </Link>
                <ul className="dropdown-menu" aria-labelledby="eventsMenu">
                  <li className="dropdown-submenu dropend">
                    <Link to="/activities" className="dropdown-item">
                      <i className="fas fa-running me-2"></i>Activities
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to="/adventure" className="dropdown-item">
                      <i className="fas fa-mountain me-2"></i>Adventure
                    </Link>
                  </li>
                  <li className="dropdown-submenu dropend">
                    <Link to="/celebration" className="dropdown-item">
                      <i className="fas fa-glass-cheers me-2"></i>Celebration
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to={"/contact"}
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div>
              <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                <div className="nav-item w-100">
                  <div className="row align-items-center justify-content-center text-centerx">
                    <div
                      className="ms-3 col-lg-1 col-md-1 col-2 px-1"
                      style={{ fontSize: "17px" }}
                    >
                      <Link to={"/wishlist"}>
                        <Heart size={20} className="text-dark" />
                      </Link>
                    </div>
                    <div
                      className="ms-3 col-lg-1 col-md-1 col-2 px-1"
                      style={{ fontSize: "17px" }}
                    >
                      <Link>
                        <MapPin size={20} className="text-dark" />
                      </Link>
                    </div>
                    <div
                      className="ms-3 col-lg-1 col-md-1 col-2 px-1"
                      style={{ fontSize: "17px" }}
                    >
                      <Link to={"/cart"}>
                        <ShoppingBag size={20} className="text-dark" />
                      </Link>
                    </div>
                    <div
                      className={`m-0 p-0 w-auto nav-btns d-none ${
                        isLoggedIn ? "" : "mt-3"
                      }`}
                    >
                      <div className="nav-item navbtn me-2 dropdown border rounded  btn btn-sm mb-0">
                        {isLoggedIn ? (
                          <Link
                            className="course-btn-enhanced flex-fill text-center"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        ) : (
                          <Link
                            className="course-btn-enhanced flex-fill text-center"
                            onClick={() => setVisible(true)}
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Enquire now
                          </Link>
                        )}
                      </div>
                    </div>
                    {isLoggedIn ? (
                      ""
                    ) : (
                      <div className="m-0 mt-3 p-0 w-auto nav-btns d-none">
                        <div className="nav-item navbtn1 dropdown border rounded  btn btn-sm mb-0">
                          <Link
                            className="nav-link"
                            aria-haspopup="true"
                            aria-expanded="false"
                            to={
                              "https://wa.me/+917987841662?text=Hii!%20LetSkillify"
                            }
                          >
                            Call now
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="logo-icon">
            <div className="nav-item me-2 dropdown rounded  btn btn-sm mb-0">
              {isLoggedIn ? (
                <Link
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  className="course-btn-enhanced flex-fill text-center"
                  onClick={() => setVisible(true)}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Enquire now
                </Link>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            ""
          ) : (
            <div className="logo-icon">
              <div className="course-btn-enhanced course-btn-secondary flex-fill">
                <Link
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded="false"
                  to={"https://wa.me/+917987841662?text=Hii!%20LetSkillify"}
                >
                  Call now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
