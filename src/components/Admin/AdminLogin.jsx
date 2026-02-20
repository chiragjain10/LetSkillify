// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, navigate to admin dashboard
      navigate("/admin_dash");
    } catch (err) {
      // Show error if login fails
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Admin Portal</h2>
          <p className="text-muted">Sign in to manage your dashboard</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{
              background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
              border: "none",
              padding: "10px",
              fontSize: "16px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} Admin Panel
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
