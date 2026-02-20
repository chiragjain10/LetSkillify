import { useState } from "react";
import Breadcrumbs from "../../components/Breadcums";
import { motion } from "framer-motion";
const Founder = () => {
  const directors = {
    name: "Chirag Jain",
    role: "Founder & CEO",
    image: "public/assets/images/review/founder.jpg",
    quote:
      "Empowering the next generation of developers with practical skills and real-world experience",
    social: {
      linkedin: "https://www.linkedin.com/in/chiragjain",
      twitter: "https://twitter.com/chiragjain",
      github: "https://github.com/chiragjain",
    },
    expertise: [
      "Full Stack Development",
      "Tech Leadership",
      "Project Management",
      "Digital Marketing",
      "Business Strategy",
    ],
    certifications: [
      "AWS Certified Developer",
      "Google Cloud Professional",
      "MERN Stack Specialist",
      "Certified Scrum Master",
    ],
    keyAchievements: [
      "Built a community of 5000+ tech enthusiasts",
      "Conducted 50+ tech workshops",
      "Featured in top tech publications",
      "Mentored 500+ students",
    ],
    fullBio: `As the founder and CEO of LetSkillify, I bring over a decade of experience in technology and education.

My journey began with a vision to bridge the gap between traditional education and industry requirements.

• Successfully trained over 500+ students in web development
• Led 100+ successful client projects
• Built a team of 50+ skilled professionals
• Pioneered innovative learning methodologies

I believe in hands-on learning and practical experience as the key to success in the tech industry.`,
    achievements: {
      projects: "50+",
      experience: "8+",
      students: "50+",
      teamSize: "20+",
    },
  };
  return (
    <>
      <Breadcrumbs />
      <div className="container my-5">
        {/* Founder Quote */}
        <div className="ls-founder-quote">
          <div className="quote-inner">
            <div className="quote-marks">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="quote-text">{directors.quote}</p>
            <div className="quote-author">
              <span className="author-name">{directors.name}</span>
              <span className="author-role">{directors.role}</span>
            </div>
          </div>
        </div>
        {/* Founder details */}
        <div className="md-popup-overlay">
          <div className="md-popup-content modern-popup">
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="text-center">
                  <div className="founder-image-container">
                    <img
                      src={directors.image}
                      alt={directors.name}
                      className="img-fluid rounded-4 popup-image"
                    />
                    <div className="experience-badge">
                      {directors.achievements.experience} Years Experience
                    </div>
                  </div>

                  <div className="social-links-popup my-4">
                    {Object.entries(directors.social).map(
                      ([platform, link]) => (
                        <a
                          key={platform}
                          href={link}
                          className="md-social-btn mx-2"
                        >
                          <i className={`fab fa-${platform}`}></i>
                        </a>
                      )
                    )}
                  </div>

                  <div className="expertise-section">
                    <h5 className="section-title">Areas of Expertise</h5>
                    <div className="expertise-tags">
                      {directors.expertise.map((skill, index) => (
                        <span key={index} className="expertise-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="popup-header mb-4">
                  <h2 className="display-6 mb-2">{directors.name}</h2>
                  <div className="role-badge d-inline-block bg-primary text-white rounded-3 p-2">
                    {directors.role}
                  </div>
                </div>

                <div className="key-achievements mb-4">
                  <h5 className="mb-3">Key Achievements</h5>
                  <div className="row g-3">
                    {directors.keyAchievements.map((achievement, index) => (
                      <div key={index} className="col-md-6">
                        <div className="achievement-card bg-light rounded-3 p-2">
                          <i className="fas fa-trophy text-primary me-2"></i>
                          {achievement}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bio-content">
                  {directors.fullBio.split("\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        paragraph.trim().startsWith("•")
                          ? "achievement-point"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Achievements */}
        <div className="ls-achievements-section-founder my-5">
          <div className="achievement-container">
            <motion.div
              className="achievement-header text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="header-badge">
                <span className="badge-dot"></span>
                <span>Our Growth Story</span>
                <span className="badge-dot"></span>
              </div>
              <h2>Milestones & Achievements</h2>
            </motion.div>

            <div className="achievement-cards">
              {[
                {
                  value: "50+",
                  label: "Projects Delivered",
                  icon: "fas fa-rocket",
                  color: "#066ae1",
                  description: "Successful client projects",
                },
                {
                  value: "8+",
                  label: "Years Experience",
                  icon: "fas fa-star",
                  color: "#FF6B6B",
                  description: "Industry expertise",
                },
                {
                  value: "50+",
                  label: "Students Trained",
                  icon: "fas fa-graduation-cap",
                  color: "#4ECDC4",
                  description: "Career transformations",
                },
                {
                  value: "20+",
                  label: "Team Members",
                  icon: "fas fa-users",
                  color: "#96C93D",
                  description: "Skilled professionals",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="achievement-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="card-content-founder">
                    <div
                      className="icon-wrapper"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <i
                        className={item.icon}
                        style={{ color: item.color }}
                      ></i>
                      <div
                        className="icon-ring"
                        style={{ borderColor: item.color }}
                      ></div>
                    </div>

                    <motion.h3
                      className="achievement-value"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      {item.value}
                    </motion.h3>

                    <h4 className="achievement-label">{item.label}</h4>
                    <p className="achievement-description">
                      {item.description}
                    </p>

                    <div className="card-decoration">
                      <div
                        className="decoration-circle"
                        style={{ backgroundColor: `${item.color}10` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Founder;
