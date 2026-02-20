import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Breadcrumbs from "../Breadcums";
const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 80;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const testimonials = [
    {
      name: "Dr. Pooja Jain Indore",
      feedback:
        "I truly appreciate the website designed by LetSkillify. They developed a user-friendly and professional website for my homeopathy practice, making it easy to navigate and manage. Their expertise has helped me connect effectively with my patients. Thank you, LetSkillify, for your outstanding work!",
      image: "/assets/images/client logo/Dr.-Pooja-Jain_Original.webp",
      rating: 5,
    },
    {
      name: "Archaean Pro Design",
      feedback:
        "I am extremely satisfied with the website developed by LetSkillify. They built Archaean Pro Design (archaeanpro.in) using Angular, ensuring high performance, responsiveness, and a seamless user experience. Their expertise in modern web technologies has helped us create an effective and engaging educational platform. Great job by the team!",
      image: "/assets/images/client logo/archaeanpro-Design_Original.webp",
      rating: 5,
    },
    {
      name: "DBSR College",
      feedback:
        "LetSkillify has done a fantastic job designing our DBSR College website (dbsrcollege.in) using WordPress. The platform is easy to manage and update, offering a professional look and smooth user experience—crucial for showcasing our pharmacy programs. Their dedication and support throughout the process have been commendable. Thank you, LetSkillify!",
      image: "/assets/images/client logo/DBSR-Original.webp",
      rating: 5,
    },
    {
      name: "Design Aspirants",
      feedback:
        "We are thrilled with the website and mobile app developed by LetSkillify. They created our website on WordPress for a strong online presence and built a Flutter-based mobile app for an intuitive user experience. Their expertise and commitment have helped us connect better with aspiring designers. Thank you, LetSkillify, for your exceptional work!",
      image: "/assets/images/client logo/Design-Aspirants_Original.webp",
      rating: 5,
    },
    {
      name: "Investo Bazar WEALTH NIVESH PVT LTD",
      feedback:
        "LetSkillify has done an outstanding job designing our website, Investo Bazar WEALTH NIVESH PVT LTD (investobazar.com), using HTML, CSS, and JavaScript. The site is well-structured, user-friendly, and perfectly represents our financial services. Their attention to detail and commitment to transparency have helped us build a platform that instills trust in our clients. Excellent work by the team!",
      image: "/assets/images/client logo/Investobazar_Original.webp",
      rating: 5,
    },
    {
      name: "The Tea Factory",
      feedback:
        "LetSkillify has done a remarkable job designing The Tea Factory website (theteafactorygroup.com) using WordPress. The platform beautifully showcases our journey, franchise opportunities, and extensive tea menu. Their expertise has helped us create a seamless, engaging, and user-friendly website that supports our business growth. We truly appreciate their dedication and professionalism!",
      image: "/assets/images/client logo/The-Tea-Factory_Original.png",
      rating: 5,
    },
  ];

  const teamMembers = [
    {
      name: "Gourav Dabar",
      role: "Sr. Graphic Designer & Trainer",
      image: "/assets/images/review/gouravsir.webp",
      //   linkdin:"http://www.linkedin.com/in/parivesh-rimjha-672a1b206",
    },
    {
      name: "Mohit Jain",
      role: "Digital Marketer & Trainer,",
      image: "assets/images/Team member/mohit-sir.jpg",
      linkdin: "http://www.linkedin.com/in/yash-chouhan-bbbb8b28b",
    },
    {
      name: "Sapna",
      role: "Graphic Designer & Trainer",
      image: "public/assets/images/Team member/sapna.jpg",
      linkdin: "https://www.linkedin.com/in/nakshatra-sharma-648a76258",
    },
    {
      name: "Divy Arora",
      role: "Full Stack Developer",
      image: "assets/images/Team member/divya.jpg",
      linkdin: "https://www.linkedin.com/in/mohini-patel-669638249",
    },
    {
      name: "Sanidhya Garani",
      role: "Full Stack Developer",
      image: "public/assets/images/Team member/sanidhya.jpg",
      linkdin: "http://www.linkedin.com/in/parivesh-rimjha-672a1b206",
    },
    {
      name: "Arpit Prajapati",
      role: "Frontend Developer (React)",
      image: "assets/images/Team member/Arpit.jpg",
      linkdin: "https://www.linkedin.com/in/arpit-kumar-prajapat-29559a358/",
    },
    {
      name: "Umansh Kumar Sharma",
      role: "Mobile Application Developer",
      image: "assets/images/Team member/umansh.jpg",
      linkdin: "https://in.linkedin.com/in/umansh-sharma-323175211",
    },
    {
      name: "Abhay",
      role: "Full Stack Developer",
      image: "/assets/images/Team member/Abhay.png",
      linkdin: "http://www.linkedin.com/in/yash-chouhan-bbbb8b28b",
    },
    {
      name: "Mahek",
      role: "Graphic Designer",
      image: "assets/images/Team member/Mahak.png",
      linkdin: "https://www.linkedin.com/in/shakir-khan43/",
    },
    {
      name: "Tushar Kaithwas",
      role: "Frontend Developer",
      image: "public/assets/images/Team member/tushar.jpg",
      linkdin: "http://www.linkedin.com/in/tushar-kaithwas",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <Breadcrumbs />
      <Helmet>
        <title>About Us – Learn Web Development with Experts</title>
        <meta
          name="description"
          content="Know more about our mission to provide affordable Full Stack training and help students build careers."
        />
        <meta
          name="keywords"
          content="About us, Web Development Training, Full Stack Course, IT Career, Learn Coding"
        />
        <meta
          property="og:title"
          content="About Us – Learn Web Development with Experts"
        />
        <meta
          property="og:description"
          content="We provide industry-level training in Full Stack Web Development with affordable pricing and real-world projects."
        />
        <meta
          property="og:image"
          content="https://letskillify.com/assets/images/about/about.jpg"
        />
        <meta property="og:url" content="https://letskillify.com/about" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="About Us – Learn Web Development with Experts"
        />
        <meta
          name="twitter:description"
          content="Our mission is to train students with real-world coding skills to make them job-ready."
        />
        <meta
          name="twitter:image"
          content="https://letskillify.com/assets/images/about/about.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* About-Banner */}
      <section id="AboutCompany" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="abouttop col-md-6 col-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-content">
                <motion.h2
                  className="mb-4 h2 fw-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Hey, It's Let<span className="text-primary">Skill</span>ify
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="badge bg-primary px-3 py-2 mb-4">
                    Learn & Earn Together
                  </span>
                </motion.div>

                <div className="about-paragraphs">
                  {[
                    `LetSkillify is a platform dedicated to connect education with real job opportunities. Founded by Chirag Jain, LetSkillify offers a unique mix of learning and earning experiences.`,
                    `We focus on personalized guidance and practical training that meets the specific needs of each person. Our mission is to help you learn valuable skills and apply them in real-life situations.`,
                    `We're your partners in achieving success, helping you overcome challenges and open doors to new opportunities in your career.`,
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      className="mb-3 about-text"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-md-6 col-12 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-image-container">
                <motion.div
                  className="image-wrapper"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/assets/images/about/about-banner-main.png"
                    alt="LetSkillify About"
                    className="img-fluid main-image"
                  />
                </motion.div>

                {/* Decorative elements */}
                <div className="decoration-circle-about circle-about-1"></div>
                <div className="decoration-circle-about circle-about-2"></div>
                {/* <div className="decoration-dot dot-1"></div>
                <div className="decoration-dot dot-2"></div>
                <div className="decoration-dot dot-3"></div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder & CEO Section */}
      <section className="letskillify-founder-section py-5">
        <div className="container">
          <div className="ls-founder-card">
            <div className="row align-items-center g-0">
              {/* Left Side - CEO Image */}
              <div className="col-lg-5 position-relative">
                <motion.div
                  className="ls-founder-image-container"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="ls-image-wrapper">
                    <img
                      src="/assets/images/review/founder.jpg"
                      alt="Chirag Jain - CEO"
                      className="ls-founder-profile-img"
                    />
                    <div className="ls-image-gradient-overlay"></div>
                  </div>
                  <div className="ls-founder-title-badge">Founder & CEO</div>
                </motion.div>
              </div>
              {/* Right Side - Content */}
              <div className="col-lg-7">
                <div className="ls-founder-content">
                  <motion.div
                    className="ls-content-header"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="ls-founder-subtitle">Meet Our Leader</span>
                    <h2 className="ls-founder-name">Chirag Jain</h2>
                    <div className="ls-expertise-wrapper">
                      <span>Full Stack Developer</span>
                      <span>Tech Mentor</span>
                      <span>Entrepreneur</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="ls-founder-bio"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p className="ls-bio-text">
                      "With a passion for technology and education, I've
                      dedicated my career to helping individuals gain practical
                      skills that lead to real-world success. My journey as a
                      developer and career counselor has shown me the gaps in
                      traditional education."
                    </p>
                  </motion.div>

                  <div className="ls-stats-grid">
                    <div className="ls-stat-item">
                      <h4>500+</h4>
                      <p>Students Trained</p>
                    </div>
                    <div className="ls-stat-item">
                      <h4>100+</h4>
                      <p>Projects Done</p>
                    </div>
                    <div className="ls-stat-item">
                      <h4>50+</h4>
                      <p>Team Members</p>
                    </div>
                  </div>

                  <div className="ls-social-wrapper d-flex justify-content-between">
                    <div className="ls-social-icons">
                      <a href="#" className="ls-social-icon">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="ls-social-icon">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="ls-social-icon">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                    <div>
                      <Link to="/founder">
                        <span className="btn btn-primary">
                          {" "}
                          More{" "}
                          <i className="fas fa-arrow-right text-white ms-2"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <style jsx>{`
          .letskillify-founder-section {
            padding: 5rem 0;
            background: #f8f9fa;
          }

          .ls-founder-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }

          .ls-founder-image-container {
            position: relative;
            padding: 2rem ;
          }

          .ls-image-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            box-shadow: 0 15px 30px rgba(6, 106, 201, 0.15);
          }

          .ls-founder-profile-img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.5s ease;
          }

          .ls-image-gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              45deg,
              rgba(6, 106, 201, 0.1),
              rgba(6, 106, 201, 0.05)
            );
            pointer-events: none;
          }

          .ls-image-wrapper:hover .ls-founder-profile-img {
            transform: scale(1.05);
          }

          .ls-founder-title-badge {
            position: absolute;
            bottom: 40px;
            right: 0;
            background: #066ae1;
            color: white;
            padding: 12px 25px;
            border-radius: 30px 0 0 30px;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 5px 15px rgba(6, 106, 201, 0.2);
            z-index: 2;
          }

          .ls-founder-content {
            padding: 2rem 3rem;
          }

          .ls-founder-subtitle {
            color: #066ae1;
            font-size: 1.1rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .ls-founder-name {
            font-size: 2.8rem;
            font-weight: 700;
            margin: 1rem 0;
            color: #333;
          }

          .ls-expertise-wrapper {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin: 1.5rem 0;
          }

          .ls-expertise-wrapper span {
            background: rgba(6, 106, 201, 0.1);
            color: #066ae1;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
          }

          .ls-founder-bio {
            margin: 2rem 0 0;
            padding: 1.5rem;
            background: rgba(6, 106, 201, 0.03);
            border-radius: 15px;
            border-left: 4px solid #066ae1;
          }

          .ls-bio-text {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #555;
            font-style: italic;
            margin-bottom: 0px !important;
          }

          .ls-stats-grid {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0 0;
            gap: 1rem;
          }

          .ls-stat-item {
            text-align: center;
            padding: 1rem;
          }

          .ls-stat-item h4 {
            font-size: 2rem;
            color: #066ae1;
            margin-bottom: 0.5rem;
            font-weight: 700;
          }

          .ls-stat-item p {
            color: #666;
            font-size: 0.9rem;
          }

          .ls-social-wrapper {
            padding-top: 2rem;
            border-top: 1px solid #eee;
          }

          .ls-social-icons {
            display: flex;
            gap: 1rem;
          }

          .ls-social-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #066ae1;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .ls-social-icon:hover {
            transform: translateY(-3px);
            background: #fff;
            color: #066ae1;
            border: 2px solid #066ae1;
          }

          @media (max-width: 991px) {
            .ls-founder-image-container {
              padding: 1.5rem;
              display: flex;
              justify-content: center;
            }

            .ls-image-wrapper {
              max-width: 350px;
            }

            .ls-founder-title-badge {
              bottom: 30px;
              padding: 10px 20px;
            }
          }
        `}</style> */}
      </section>

      {/* Our Mission and Vision */}
      <section
        ref={containerRef}
        className="position-relative py-5 overflow-hidden"
      >
        <motion.div
          className="position-absolute w-100 h-100"
          style={{ opacity: 0.5 }}
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #066ac9 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #066ac9 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #066ac9 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container position-relative z-1 py-5">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-5"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-3 mb-md-0 mb-sm-0"
            >
              <span className="badge bg-primary text-white shadow-lg px-4 py-2">
                Transforming Education
              </span>
            </motion.div>
            <motion.div style={{ y }}>
              <h2 className="letskillify-title display-4 fw-bold text-primary">
                Our Mission & Vision
              </h2>
            </motion.div>
          </motion.div>

          {/* Cards Container */}
          <div className="row g-4 justify-content-center">
            {/* Mission Card */}
            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="position-relative bg-white shadow rounded-3 p-4 h-100">
                <div className="d-flex align-items-center">
                  <motion.div
                    className="bg-primary rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: "4rem", height: "4rem" }}
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <i className="fas fa-bullseye text-white fs-2"></i>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-3 ms-3 fw-bold text-primary"
                  >
                    Mission
                  </motion.h3>
                </div>

                <div className="mt-3">
                  {[
                    "At LetSkillify, our mission is to change the way people learn by offering practical skills that lead to real jobs.",
                    "We want to help people gain the knowledge they need to succeed in today's job market, while also providing opportunities to earn money as they learn.",
                    "Our goal is to help people build their careers and create new job opportunities along the way.",
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      className="vision-text text-dark"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="position-relative bg-white shadow rounded-3 p-4 h-100">
                <div className="d-flex align-items-center">
                  <motion.div
                    className="bg-primary rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: "4rem", height: "4rem" }}
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <i className="fas fa-eye text-white fs-2"></i>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-3 ms-3 fw-bold text-primary"
                  >
                    Vision
                  </motion.h3>
                </div>

                <div className="mt-3">
                  {[
                    "Our vision is to offer you a platform where learning is directly linked to earning. We opt to offer training that is useful in the real world and helps people get jobs.",
                    "On our platform, you can learn new skills, find job opportunities, and earn money at different levels while learning.",
                    "We aim to make education more practical and rewarding, helping everyone build a better future.",
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      className="vision-text text-dark"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-sm-flex justify-content-sm-between">
                <h2 className="mb-0 letskillify-title">Meet Our Team</h2>
                <Link to={"/signup"} className="btn btn-light mt-2">
                  Join Team
                </Link>
              </div>
              <Slider {...sliderSettings} className="mt-2 mt-sm-5">
                {teamMembers.map((member, index) => (
                  <div key={index} className="p-2">
                    <div
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="team-card bg-white rounded-4 overflow-hidden shadow-sm"
                    >
                      <div className="position-relative team-image-wrapper overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-100 team-member-image"
                          style={{ height: "340px", objectFit: "contain" }}
                        />
                        <div className="team-overlay">
                          <div className="social-icons d-flex gap-3 justify-content-center">
                            <a
                              href={member.linkdin}
                              target="_blank"
                              className="social-icon"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                            {/* <a href={member.twitter} target="_blank" className="social-icon">
                              <i className="fab fa-twitter"></i>
                            </a> */}
                            <a
                              href={member.github}
                              target="_blank"
                              className="social-icon"
                            >
                              <i className="fab fa-github"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 text-center team-content">
                        <h4 className="mb-1 fw-bold fs-5 text-primary">
                          {member.name}
                        </h4>
                        <p className="">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Add Testimonial Section */}
      <section>
        <div
          className="testimonial-section py-5"
          style={{ backgroundColor: "#066ac9" }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold gradient-text mb-4">
                What Our Clients Say
              </h2>
            </div>

            <div className="row testimonial-slider">
              {testimonials.map((testimonial, index) => (
                <div
                  className="col-lg-4 col-md-6 mb-4"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      <div className="quote-icon">
                        <i className="fas fa-quote-right"></i>
                      </div>
                      <p className="quote-text">
                        {isExpanded
                          ? testimonial.feedback
                          : `${testimonial.feedback.substring(
                              0,
                              maxLength
                            )}...`}
                        {testimonial.feedback.length > maxLength && (
                          <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="btn m-0 p-0 ps-1 text-primary "
                            style={{ fontSize: "1.3rem" }}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </p>

                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                    <div className="testimonial-author">
                      <div className="author-image">
                        <img
                          src={testimonial.image}
                          className="img-fluid"
                          alt={testimonial.name}
                        />
                      </div>
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
