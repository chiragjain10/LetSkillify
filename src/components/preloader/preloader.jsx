// src/components/Preloader.jsx
import Lottie from "lottie-react";
import animationData from "../../assets/loader.json"; // path to your JSON

export default function Preloader() {
  return (
    <div className="preloader">
      <Lottie animationData={animationData} loop={true} style={{ width: 150, height: 150 }} />
      <p className="loading-text">Loading...</p>
    </div>
  );
}
