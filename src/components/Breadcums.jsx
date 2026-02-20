import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const pageTitle = pathnames[pathnames.length - 1] || 'Home';

  return (
    <div className="breadcrumb-wrapper">
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source 
            src="/assets/videos/Wallpaper-1.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Floating Elements */}
      <div className="animated-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="glow-dot"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: '100%',
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="breadcrumb-container">
        <h1 className="breadcrumb-title">
          {pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}
        </h1>

        <div className="breadcrumb-content">
          <Link to="/" className="breadcrumb-home">
            <i className="fas fa-home"></i>
          </Link>

          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <div key={name} className="breadcrumb-item">
                <i className="fas fa-chevron-right separator"></i>
                {isLast ? (
                  <span className="current-page">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                ) : (
                  <Link to={routeTo}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;

