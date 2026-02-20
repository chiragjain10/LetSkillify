import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import fallbackData from './ourWork.json';

const OurWorks = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksRef = collection(db, 'our_works');
        const q = query(worksRef, orderBy('name', 'asc'));
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (list.length > 0) setItems(list);
        else setItems(fallbackData);
      } catch (e) {
        console.error('Error fetching works:', e);
        setItems(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);
  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section className="our-works-enhanced py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        {/* Header */}
        <div className="row mb-5 text-center">
          <div className="col-lg-8 mx-auto">
            <h2 className="works-title-enhanced" style={{ color: '#1e1e2f', fontWeight: '700' }}>
              Our Works
            </h2>
            <div className="header-badge my-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge-dot" style={{ width: '10px', height: '10px', background: '#ff4d6d', borderRadius: '50%' }}></span>
              <span style={{ color: '#6c757d', fontWeight: '500' }}>Check out our awesome works</span>
              <span className="badge-dot" style={{ width: '10px', height: '10px', background: '#ff4d6d', borderRadius: '50%' }}></span>
            </div>
          </div>
        </div>

        {/* Slider */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
        <Slider {...sliderSettings}>
          {items.map((item) => (
            <div key={item.id} className="px-2">
              <div
                className="work-card-enhanced position-relative overflow-hidden rounded-2"
                style={{
                  borderRadius: '1rem',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s',
                  }}
                />
                {/* Overlay */}
                <div
                  className="work-overlay-enhanced position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                    color: '#fff',
                    opacity: 0,
                    transition: 'opacity 0.5s',
                  }}
                >
                  <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{item.name}</h4>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ff4d6d',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      transition: 'background 0.3s, color 0.3s',
                      textDecoration: 'none',
                    }}
                  >
                    <i className="fas fa-external-link-alt me-2"></i>View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        )}
      </div>

      {/* CSS Hover Effects */}
      <style>
        {`
          .work-card-enhanced:hover img {
            transform: scale(1.1);
          }
          .work-card-enhanced:hover .work-overlay-enhanced {
            opacity: 1;
          }
        `}
      </style>
    </section>
  );
};

export default OurWorks;
