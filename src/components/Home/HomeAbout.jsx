import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeAbout = () => {
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const faqData = [
    {
      id: 1,
      question: "What courses do you offer?",
      answer:
        "We offer a wide range of courses including Web Development, Data Science, Digital Marketing, and more. Each course is designed to provide practical skills and industry knowledge.",
      image: "./assets/images/about/13.jpg",
      icon: "fas fa-graduation-cap",
      iconBg: "#4CAF50",
    },
    {
      id: 2,
      question: "How long are the courses?",
      answer:
        "Course duration varies depending on the program. Most courses range from 8-12 weeks, with flexible scheduling options to accommodate different learning paces and commitments.",
      image: "./assets/images/about/11.jpg",
      icon: "fas fa-clock",
      iconBg: "#2196F3",
    },
    {
      id: 3,
      question: "Are the courses suitable for beginners?",
      answer:
        "Yes! Our courses are designed for all skill levels. Beginners will find comprehensive introductions, while advanced learners can dive deeper into complex topics.",
      image: "./assets/images/about/14.jpg",
      icon: "fas fa-user-graduate",
      iconBg: "#FF9800",
    },
    {
      id: 4,
      question: "What support do you provide?",
      answer:
        "We provide 24/7 mentor support, live sessions, practical projects, and career guidance. Our dedicated team ensures you have everything needed for success.",
      image: "./assets/images/about/12.jpg",
      icon: "fas fa-hands-helping",
      iconBg: "#9C27B0",
    },
  ];

  const handleQuestionClick = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
    const newIndex = faqData.findIndex((item) => item.id === id);
    setCurrentImageIndex(newIndex >= 0 ? newIndex : 0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleQuestionClick(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ha-container position-relative overflow-hidden">
      {/* 🔹 SVG Background */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        className="position-absolute top-0 start-0 w-100 h-100 z-n1"
        preserveAspectRatio="none"
      >
        {/* Floating Blob 1 */}
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="rgba(33,150,243,0.08)"
          animate={{ cx: [180, 220, 180], cy: [180, 220, 180] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        />
        {/* Floating Blob 2 */}
        <motion.circle
          cx="600"
          cy="150"
          r="100"
          fill="rgba(76,175,80,0.1)"
          animate={{ cx: [580, 620, 580], cy: [140, 180, 140] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        />
        {/* Abstract Wave Line */}
        <motion.path
          d="M0,300 Q400,100 800,300 T1600,300"
          fill="none"
          stroke="rgba(156,39,176,0.15)"
          strokeWidth="80"
          animate={{
            d: [
              "M0,300 Q400,100 800,300 T1600,300",
              "M0,320 Q400,120 800,280 T1600,320",
              "M0,300 Q400,100 800,300 T1600,300",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.svg>

      {/* Header */}
      <motion.div
        className="ha-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="ha-badge">
          <i className="fas fa-question-circle"></i>
          <span>FAQ</span>
        </div>
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about our courses and learning experience</p>
      </motion.div>

      <div className="ha-main-content">
        {/* Image Section */}
        <motion.div
          className="ha-image-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="ha-image-container"
            key={currentImageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={faqData[currentImageIndex].image}
              alt="FAQ illustration"
              onError={(e) => {
                e.target.src = "/assets/images/default.jpeg";
              }}
            />
            <div
              className="ha-image-overlay"
              style={{
                background: `linear-gradient(45deg, ${faqData[currentImageIndex].iconBg}40, transparent)`,
              }}
            />
            <div className="ha-content-overlay">
              <motion.div
                className="ha-icon-badge"
                style={{ background: faqData[currentImageIndex].iconBg }}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <i className={faqData[currentImageIndex].icon}></i>
              </motion.div>
              <span className="ha-question-number">
                Question {currentImageIndex + 1}
              </span>
              <h3 className="text-white">{faqData[currentImageIndex].question}</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Items */}
        <div className="ha-faq-content">
          {faqData.map((item) => (
            <motion.div
              key={item.id}
              className={`ha-faq-item ${activeQuestion === item.id ? "ha-active" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: item.id * 0.1 }}
              style={{
                borderLeftColor: activeQuestion === item.id ? item.iconBg : "transparent",
              }}
            >
              <button
                className="ha-faq-question"
                onClick={() => handleQuestionClick(item.id)}
              >
                <div
                  className="ha-faq-icon"
                  style={{
                    background: activeQuestion === item.id ? item.iconBg : "#f5f5f5",
                    color: activeQuestion === item.id ? "white" : "#666",
                  }}
                >
                  <i className={item.icon}></i>
                </div>
                <span className="ha-question-text">{item.question}</span>
                <span className={`ha-arrow ${activeQuestion === item.id ? "ha-active" : ""}`}>
                  <i className="fas fa-chevron-down"></i>
                </span>
              </button>

              <AnimatePresence>
                {activeQuestion === item.id && (
                  <motion.div
                    className="ha-faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
