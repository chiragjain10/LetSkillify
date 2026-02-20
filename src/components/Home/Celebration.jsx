import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Celebration = () => {
  const [celebrations, setCelebrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'celebrations'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCelebrations(data);
      } catch (error) {
        console.error('Error fetching celebrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrations();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 mb-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading celebrations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div
          style={{
            textAlign: "center", // Parent div ensures center alignment
          }}
        >
          <h3
            style={{
              fontSize: "40px",
              position: "relative",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Celebration
            <span
              style={{
                display: "block",
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%", // Line short 
                height: "5px",
                backgroundImage: "linear-gradient(to right, #066ac9, #066ac9)", // Gradient effect for beauty
                borderRadius: "5px",
                zIndex: -1,
              }}
            ></span>
          </h3>

        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {celebrations.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-balloon text-muted" style={{ fontSize: "4rem" }}></i>
              </div>
              <h4 className="text-muted mb-3">No Celebrations Available</h4>
              <p className="text-muted">Celebrations will be available soon!</p>
            </div>
          ) : (
            celebrations.map((celebration) => (
              <div
                key={celebration.id}
                style={{
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "300px",
                  height: "300px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={celebration.image}
                  alt={celebration.title || `Celebration ${celebration.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                    cursor: "pointer",
                    filter: "grayscale(100%)",
                    transform: "scale(1)",
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => handleImageClick(celebration.image)}
                />
                
                {celebration.title && (
                  <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-3">
                    <h6 className="mb-0">{celebration.title}</h6>
                    {celebration.description && (
                      <small className="text-white-50">{celebration.description}</small>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for full-view image */}
      {selectedImage && (
        <motion.div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="btn btn-link position-absolute top-0 end-0 m-3 text-white"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            &times;
          </button>

          {/* Full View Image */}
          <motion.img
            src={selectedImage}
            alt="Full View Celebration"
            style={{
              maxWidth: "90%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "5px",
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </>
  );
};

export default Celebration;
