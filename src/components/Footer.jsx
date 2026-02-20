import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="pt-5"
      style={{
        background: "#f8f9fa",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "15px",
        color: "#333",
      }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Logo and About */}
          <div className="col-lg-4 col-md-6">
            <Link className="d-block mb-3">
              <img
                className="light-mode-item image"
                src="/assets/images/icon/ls.png"
                alt="logo"
                style={{ maxHeight: "60px" }}
              />
            </Link>
            <p style={{ lineHeight: "1.6" }}>
              Letskillify education theme, built specifically for education
              centers dedicated to teaching and engaging learners.
            </p>
            <p style={{ lineHeight: "1.6" }}>
              <b>Mumbai Office:</b>{" "}
              <span style={{ fontWeight: 400 }}>
                F 30/31, First Floor, A Wing, Express Zone Mall, Off. W E
                Highway, Near Oberoi Signal, Goregaon East, Mumbai – 400063
              </span>
            </p>
            <p style={{ lineHeight: "1.6" }}>
              <b>Letskillify Office:</b>{" "}
              <span style={{ fontWeight: 400 }}>
                211, Trade House, Dhakkan Wala Kuan, South Tukoganj, HDFC
                Building, Indore (M.P) – 452001.
              </span>
            </p>
          </div>

          {/* Company & Quick Links */}
          <div className="col-lg-5 col-md-6 ps-lg-6 company-links">
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-12 mb-4">
                <h5 className="fw-semibold mb-3">Company</h5>
                <ul className="nav flex-column">
                  {[
                    { to: "/about", text: "About Us" },
                    { to: "/contact", text: "Contact Us" },
                    { to: "/courses", text: "Courses" },
                    { to: "/blogs", text: "Blogs" },
                    { to: "/products", text: "Products" },
                    { to: "/templates", text: "Templates" },
                  ].map((link, idx) => (
                    <li key={idx} className="nav-item mb-2">
                      <Link
                        className="nav-link p-0 text-dark"
                        to={link.to}
                        style={{ transition: "color 0.2s" }}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-6 col-sm-6 col-12">
                <h5 className="fw-semibold mb-3">Quick Links</h5>
                <ul className="nav flex-column">
                  {[
                    { to: "/signup", text: "Register" },
                    { to: "/privacypolicy", text: "Privacy Policy" },
                    { to: "/term&Condition", text: "Terms & Conditions" },
                    { to: "/disclaimer", text: "Disclaimer" },
                    { to: "/becamemember", text: "Become a Member" },
                  ].map((link, idx) => (
                    <li key={idx} className="nav-item mb-2">
                      <Link
                        className="nav-link p-0 text-dark"
                        to={link.to}
                        style={{ transition: "color 0.2s" }}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-12 contact-info">
            <h5 className="fw-semibold mb-3">Contact</h5>
            <p className="mb-2">
              Toll Free:
              <span className="fw-light ms-2">
                <a
                  href="tel:+917987841662"
                  style={{ color: "#066ac9", textDecoration: "none" }}
                >
                  +91 7987841662
                </a>
              </span>
              <span className="d-block small text-muted">(9:AM to 8:PM IST)</span>
            </p>
            <p className="mb-0">
              Email:
              <span className="fw-light ms-2">
                <a
                  href="mailto:info@letskillify.com"
                  style={{ color: "#066ac9", textDecoration: "none" }}
                >
                  info@letskillify.com
                </a>
              </span>
            </p>
            <div className="mt-4">
              <ul className="list-inline mb-0">
                {[
                  {
                    href: "https://www.facebook.com/profile.php?id=61564726869886",
                    icon: "fab fa-facebook-f",
                  },
                  {
                    href: "https://www.instagram.com/letskillify?igsh=NTYyMzR1Nng4ZnRn",
                    icon: "fab fa-instagram",
                  },
                  { href: "https://x.com/login?mx=2", icon: "fab fa-twitter" },
                  { href: "https://www.linkedin.com", icon: "fab fa-linkedin-in" },
                ].map((social, idx) => (
                  <li key={idx} className="list-inline-item me-2">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light btn-sm shadow px-2"
                      style={{
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#066ac9",
                      }}
                    >
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="mt-4 mb-0" />
      </div>

      {/* Bottom Bar */}
      <div
        className="py-3 text-center"
        style={{ backgroundColor: "#066ac9", color: "white" }}
      >
        <p className="mb-0">
          © {currentYear}{" "}
          <Link to="/" className="text-white fw-semibold">
            letSkillify India, Inc.
          </Link>{" "}
          – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
