import React, { useState } from "react";
import imageData from "./AdventureImage.json";

const AdventureImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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
    marginBottom: "49px",
  }}
>
  Adventure
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
          }}
        >
          {imageData.map((image) => (
            <div
              key={image.id}
              style={{
                borderRadius: "8px",
                textAlign: "center",
                width: "300px", // Increased width
                height: "300px", // Set height
                overflow: "hidden", // Ensure image stays within bounds when scaled
              }}
            >
              <img
                src={image.img}
                alt={`Adventure ${image.id}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                  cursor: "pointer",
                  filter: "grayscale(100%)",
                  transform: "scale(1)", // Default scale
                  transition: "transform 0.4s ease, filter 0.4s ease", // Smooth transition for both scale and filter
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => handleImageClick(image.img)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-view image */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
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
          <img
            src={selectedImage}
            alt="Full View"
            style={{
              maxWidth: "90%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "5px",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      )}
    </>
  );
};

export default AdventureImage;
