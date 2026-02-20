import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../Breadcums";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Certificate() {
  const [technical, setTechnical] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const snap = await getDocs(collection(db, "certificates"));
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setTechnical(all.filter((i) => (i.category || "technical") === "technical"));
        setProfessional(all.filter((i) => i.category === "professional"));
      } catch (e) {
        setTechnical([]);
        setProfessional([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <>
      <Breadcrumbs />
      <section className="certificate-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>Technical Excellence</span>
              <span className="badge-dot"></span>
            </div>
            <h2>Technical Certifications</h2>
          </motion.div>

          <div className="certificate-grid">
            {!loading &&
              technical.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  className="certificate-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="card-image">
                    <img src={cert.image} alt={cert.title} />
                    <div className="image-overlay">
                      <i className="fas fa-award"></i>
                    </div>
                  </div>
                  <div className="card-content p-4">
                    <h3>{cert.title}</h3>
                    <div className="issuer-info">
                      <span>{cert.issuer}</span>
                      <span className="date">{cert.completionTime}</span>
                    </div>
                    <div className="skills-tags">
                      {(cert.skills || []).map((skill, idx) => (
                        <span key={idx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="certificate-section bg-light">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>Professional Growth</span>
              <span className="badge-dot"></span>
            </div>
            <h2>Professional Certifications</h2>
          </motion.div>

          <div className="certificate-grid">
            {!loading &&
              professional.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  className="certificate-card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="card-image">
                    <img src={cert.image} alt={cert.title} />
                    <div className="image-overlay">
                      <i className="fas fa-certificate"></i>
                    </div>
                  </div>
                  <div className="card-content p-4">
                    <h3>{cert.title}</h3>
                    <div className="issuer-info">
                      <span>{cert.issuer}</span>
                      <span className="date">{cert.completionTime}</span>
                    </div>
                    <div className="skills-tags">
                      {(cert.skills || []).map((skill, idx) => (
                        <span key={idx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
