import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fallbackPartners from "./TrustedPartner.json";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const TrustedPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePartner, setActivePartner] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const ref = collection(db, "trusted_partners");
        const q = query(ref, orderBy("ParnerName", "asc"));
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (list.length > 0) setPartners(list);
        else setPartners(fallbackPartners);
      } catch (e) {
        console.error("Error fetching partners:", e);
        setPartners(fallbackPartners);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: !isHovered,
    autoplaySpeed: 3000,
    rtl: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="trusted-partners-section position-relative overflow-hidden">
        {/* 🔹 Background Animated SVG */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 400"
          className="position-absolute top-0 start-0 w-100 h-100 z-n1"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2 }}
        >
          <motion.circle
            cx="200"
            cy="200"
            r="200"
            fill="#0d6efd"
            animate={{ cx: [200, 240, 220, 200], cy: [200, 180, 220, 200] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.circle
            cx="650"
            cy="250"
            r="150"
            fill="#6610f2"
            animate={{ cx: [650, 620, 680, 650], cy: [250, 230, 270, 250] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.svg>

        <div className="container position-relative">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <div className="header-badge">
                <span className="badge-dot"></span>
                <span>Projects That Define Us</span>
                <span className="badge-dot"></span>
              </div>
              <h2 className="partners-title animate-on-scroll">
                Our Trusted Partners
              </h2>
            </div>
          </div>

          <div className="partner-showcase-container animate-on-scroll">
            <div className="showcase-background"></div>
            <div className="row align-items-center">
              {/* LEFT CONTENT */}
              <div className="col-12 col-md-4">
                <div
                  className="partner-message animate-on-scroll"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="message-icon-wrapper">
                    <div className="message-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="icon-ring text-primary"></div>
                  </div>
                  <p className="message-text">
                    Wealth Management for People
                    <br /> from Leading Tech Companies
                  </p>
                  <div className="message-decoration"></div>

                  <div className="partner-stats">
                    <div className="stat-item" data-value="500">
                      <div className="stat-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="circle"
                            strokeDasharray="75, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="stat-number counter">500+</span>
                      </div>
                      <span className="stat-label">Partners</span>
                    </div>

                    <div className="stat-item" data-value="95">
                      <div className="stat-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="circle"
                            strokeDasharray="95, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="stat-number counter">95%</span>
                      </div>
                      <span className="stat-label">Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SLIDER */}
              <div className="col-12 col-md-8">
                <div
                  className="partner-slider-container"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                  <Slider
                    ref={sliderRef}
                    {...sliderSettings}
                    className="partner-slider"
                  >
                    {partners.map((item) => (
                      <div className="partner-slide" key={item.id}>
                        <div
                          className={`partner-card ${
                            activePartner === item.id ? "active" : ""
                          }`}
                          onMouseEnter={() => {
                            setActivePartner(item.id);
                            setHoveredImage(item.id);
                          }}
                          onMouseLeave={() => {
                            setActivePartner(null);
                            setHoveredImage(null);
                          }}
                        >
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-link"
                          >
                            <div className="partner-image-wrapper">
                              <div className="card-overlay">
                                <span className="view-more">
                                  <span className="view-text">View More</span>
                                  <i className="fas fa-arrow-right"></i>
                                </span>
                              </div>
                              <div className="image-frame">
                                <img
                                  className="partner-image"
                                  src={
                                    hoveredImage === item.id
                                      ? item.originalImg
                                      : item.img
                                  }
                                  alt={`Partner ${item.id}`}
                                  style={{
                                    transition: "all 0.3s ease-in-out",
                                    transform:
                                      hoveredImage === item.id
                                        ? "scale(1.05)"
                                        : "scale(1)",
                                  }}
                                  onError={(e) => {
                                    e.target.src = "/assets/images/default.webp";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="partner-info">
                              <h4 className="partner-name">
                                {item.name || "Partner"}
                              </h4>
                              <span className="partner-category">
                                {item.ParnerName}
                              </span>
                              <div className="partner-rating">
                                {[...Array(5)].map((_, index) => (
                                  <i key={index} className="fas fa-star"></i>
                                ))}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                  )}

                  <div className="slider-controls">
                    <button className="control-btn prev" onClick={goToPrev}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="control-btn next" onClick={goToNext}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* END RIGHT SLIDER */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartners;
