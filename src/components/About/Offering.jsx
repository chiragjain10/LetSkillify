import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '../Breadcums';
import { Link } from 'react-router-dom';

const OfferingsPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses = [
    {
      id: "python",
      title: "Full Stack with Python",
      description: "Master modern web development with Python",
      price: "₹49,999",
      duration: "16 weeks",
      level: "Beginner to Advanced",
      icon: "/assets/images/about/Python.svg",
      
      color: "#3776AB",
      features: [
        "Python fundamentals and advanced concepts",
        "Django framework for backend development",
        "RESTful API development",
        "Database design with PostgreSQL",
        "Frontend development with React",
        "Authentication and authorization",
        "Deployment and DevOps basics",
      ],
      stats: {
        students: "5,000+",
        rating: 4.8,
        projects: 12,
      },
      technologies: ["Python", "Django", "React", "PostgreSQL", "Git", "Docker", "AWS"],
    },
    {
      id: "nodejs",
      title: "Full Stack with Node.js",
      description: "Build scalable applications with JavaScript",
      price: "₹54,999",
      duration: "18 weeks",
      level: "Beginner to Advanced",
      icon: "/assets/images/about/Node.js.svg",
      color: "#68A063",
      features: [
        "JavaScript ES6+ and TypeScript",
        "Node.js and Express.js backend",
        "MongoDB and Mongoose",
        "React with Next.js",
        "State management with Redux",
        "GraphQL APIs",
        "Microservices architecture",
      ],
      stats: {
        students: "4,500+",
        rating: 4.7,
        projects: 15,
      },
      technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React", "Redux", "TypeScript"],
    },
    {
      id: "java",
      title: "Full Stack with Java",
      description: "Enterprise-grade development with Spring Boot",
      price: "₹59,999",
      duration: "20 weeks",
      level: "Beginner to Advanced",
      icon: "/assets/images/about/Java.svg",
      color: "#E76F00",
      features: [
        "Core Java and OOP concepts",
        "Spring Boot framework",
        "Hibernate ORM",
        "RESTful web services",
        "Microservices with Spring Cloud",
        "Angular frontend",
        "DevOps and CI/CD",
      ],
      stats: {
        students: "3,800+",
        rating: 4.9,
        projects: 10,
      },
      technologies: ["Java", "Spring Boot", "Hibernate", "Angular", "MySQL", "Jenkins", "Kubernetes"],
    },
  ];

  return (
    <>
    <Breadcrumbs />
    <div className="letskillify-offering-page ">
      {/* Courses Section */}
      <section className="letskillify-offering-courses-section">
        <div className="letskillify-offering-section-header">
          <motion.div className="header-badge"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           >
              <span className="badge-dot"></span>
              <span>Elevate Your Career with Hands-On Learning</span>
              <span className="badge-dot"></span>
            </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="letskillify-offering-section-title letskillify-title"
          >
            Our Premium <span className="text-primary">Courses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="letskillify-offering-section-description"
          >
            Choose your path to becoming a full-stack developer with our comprehensive courses
          </motion.p>
        </div>

        <div className="letskillify-offering-courses-grid">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="letskillify-offering-course-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredCard(course.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="letskillify-offering-course-header">
                <div className="letskillify-offering-course-icon" style={{ backgroundColor: `${course.color}20` }}>
                  <img src={course.icon}></img>
                </div>
                <h3 className="letskillify-offering-course-title">{course.title}</h3>
                <p className="letskillify-offering-course-description">{course.description}</p>
              </div>

              <div className="letskillify-offering-course-details">
                <div className="letskillify-offering-course-info">
                  <div className="letskillify-offering-info-item">
                    <span className="letskillify-offering-info-icon">⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="letskillify-offering-info-item">
                    <span className="letskillify-offering-info-icon">📚</span>
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="letskillify-offering-course-technologies">
                  {course.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="letskillify-offering-tech-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ backgroundColor: `${course.color}10`, color: course.color }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="letskillify-offering-course-footer">
                <div className="letskillify-offering-course-price">{course.price}</div>
                <motion.button
                  className="letskillify-offering-enroll-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: course.color }}
                >
                  Enroll Now →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="letskillify-offering-stats-section">
        <div className="letskillify-offering-stats-grid">
          {[
            { icon: "👥", label: "Active Students", value: "150+" },
            { icon: "🏆", label: "Course Completion", value: "100%" },
            { icon: "📚", label: "Total Courses", value: "20+" },
            { icon: "🚀", label: "Projects Delivered", value: "50+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="letskillify-offering-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="letskillify-offering-stat-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {stat.icon}
              </motion.div>
              <div className="letskillify-offering-stat-value">{stat.value}</div>
              <div className="letskillify-offering-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
       <section className="letskillify-offering-hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <motion.span 
            className=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="header-badge">
                <span className="badge-dot"></span>
                <span>Transform Your Career with LetSkillify</span>
                <span className="badge-dot"></span>
              </div>
           
          </motion.span>

          <motion.h1
            className="letskillify-offering-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Master Full Stack Development
          </motion.h1>

          <motion.p
            className="letskillify-offering-hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of students who have transformed their careers through our industry-leading courses
          </motion.p>

          <motion.div
            className="letskillify-offering-hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/courses">
            <motion.button
              className="letskillify-offering-primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="letskillify-offering-button-icon">⚡</span>
              Explore Courses
              <span className="letskillify-offering-arrow-icon">→</span>
            </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default OfferingsPage;

