import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // make sure your firebase.js is set up

const SubNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // If logged in, don't render this navbar
  if (user) return null;

  return (
    <div>
      <nav className="subNav border-bottom" style={{ background: "#066AC9" }}>
        <div className="container">
          <div className="row">
            {/* Social Links */}
            <div className="col-8 d-flex">
              <div className="px-2 p-1 border-start border-end">
                <a
                  href="https://www.facebook.com/profile.php?id=61564726869886"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-fw fa-facebook-f text-white"></i>
                </a>
              </div>
              <div className="px-2 p-1 border-end">
                <a
                  href="https://www.instagram.com/letskillify?igsh=NTYyMzR1Nng4ZnRn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-fw fa-instagram text-white"></i>
                </a>
              </div>
              <div className="px-2 p-1 border-end">
                <a
                  href="https://x.com/login?mx=2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-fw fa-twitter text-white"></i>
                </a>
              </div>
              <div className="px-2 p-1 border-end">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-fw fa-linkedin-in text-white"></i>
                </a>
              </div>
            </div>

            {/* Auth Links */}
            <div className="col-4 d-flex text-center justify-content-end">
              <div className="col col-lg-5 border-end border-start p-1">
                <Link to="/signup">
                  <i className="fas fa-user-plus me-2 text-white"></i>
                  <span className="d-none d-md-inline text-white">Register</span>
                </Link>
              </div>
              <div className="col col-lg-5 border-end p-1">
                <Link to="/login">
                  <i className="fas fa-sign-in-alt me-2 text-white"></i>
                  <span className="d-none d-md-inline text-white">Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SubNav;
