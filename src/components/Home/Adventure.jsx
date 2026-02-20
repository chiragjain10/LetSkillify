import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const Adventure = () => {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'adventures'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAdventures(data);
      } catch (error) {
        console.error('Error fetching adventures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 mb-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading adventures...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className={`adventure-wrapper ${selectedImage ? 'blur-content' : ''}`}>
        <section className="adventure-section py-5">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <div className="header-badge mb-3">
                  <span className="badge-dot"></span>
                  <span className="mx-2">Discover Your Next Great Adventure</span>
                  <span className="badge-dot"></span>
                </div>
                <h2 className="display-4 fw-bold">Adventure & Activities</h2>
              </div>
            </div>

            <div className="row g-4">
              {adventures.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <div className="mb-4">
                    <i className="bi bi-compass" style={{ fontSize: "4rem", color: "#6c757d" }}></i>
                  </div>
                  <h4 className="text-muted mb-3">No Adventures Available</h4>
                  <p className="text-muted">Adventure activities will be available soon!</p>
                </div>
              ) : (
                adventures.map((adventure, index) => (
                  <motion.div
                    key={adventure.id}
                    className="col-md-6 col-lg-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div 
                      className="adventure-card position-relative overflow-hidden rounded-4 shadow-lg"
                      onClick={() => handleImageClick(adventure.image)}
                      style={{ cursor: 'pointer', height: '320px' }}
                    >
                      <img
                        src={adventure.image}
                        alt={adventure.title || 'Adventure'}
                        className="adventure-image w-100 h-100"
                        style={{
                          objectFit: 'cover',
                          filter: 'grayscale(100%)',
                          transition: 'all 0.5s ease'
                        }}
                      />
                      {adventure.title && (
                        <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-gradient-dark text-white">
                          <h4 className="mb-1 fw-bold">{adventure.title}</h4>
                          {adventure.description && (
                            <p className="mb-0 small opacity-75">{adventure.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.button
              className="modal-close-btn"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={handleCloseModal}
            >
              ×
            </motion.button>

            <motion.img
              src={selectedImage}
              alt="Full view"
              className="modal-image"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style jsx>{`
        .adventure-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .adventure-card:hover .adventure-image {
          filter: grayscale(0%) !important;
          transform: scale(1.1);
        }

        .bg-gradient-dark {
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .blur-content {
          filter: blur(8px);
          transition: filter 0.3s ease;
          pointer-events: none;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.98);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          cursor: pointer;
        }

        .modal-image {
          max-width: 95vw;
          max-height: 95vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          cursor: default;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100000;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .modal-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          border-color: white;
          transform: rotate(90deg) scale(1.1);
        }

        /* Global body class when modal is open */
        :global(body.modal-open) {
          overflow: hidden;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .modal-close-btn {
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Adventure;