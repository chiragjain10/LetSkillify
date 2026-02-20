import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import Breadcrumbs from "../Breadcums";

function ForgetPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const initialValues = {
    email: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, values.email);
      setMessage("Password reset email has been sent. Please check your inbox.");
      resetForm();
    } catch (err) {
      console.error("Reset Error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <Breadcrumbs />
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden my-5">
        <div className="container">
          <div className="row">
            {/* ---------- Left Section ---------- */}
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 position-relative overflow-hidden">
              <div className="video-background">
                <video autoPlay muted loop playsInline className="background-video">
                  <source src="/assets/videos/Wallpaper-2.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
              </div>
              <div className="p-3 p-lg-5 position-relative z-2 text-center text-white">
                <img src="/assets/images/element/02.svg" className="mt-5" alt="" />
                <h2 className="fw-bold text-white">Reset Password</h2>
                <p className="mb-0 h6 text-white">
                  Don’t worry! We’ll help you get back in.
                </p>
              </div>
            </div>

            {/* ---------- Right Section ---------- */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-10 m-auto">
                  <h2 className="mb-4">Forgot your password?</h2>
                  <p className="lead mb-4">Enter your email to reset it.</p>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        {/* Email */}
                        <div className="mb-4">
                          <label htmlFor="email" className="form-label">
                            Email address *
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light border-0 text-secondary px-3">
                              <i className="bi bi-envelope-fill"></i>
                            </span>
                            <Field
                              type="email"
                              className="form-control border-0 bg-light ps-1"
                              placeholder="E-mail"
                              name="email"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* Success / Error */}
                        {message && (
                          <div className="alert alert-success text-center">
                            {message}
                          </div>
                        )}
                        {error && (
                          <div className="alert alert-danger text-center">
                            {error}
                          </div>
                        )}

                        {/* Submit */}
                        <div className="d-grid mt-3">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {/* Back to Login */}
                  <div className="mt-4 text-center">
                    <span>
                      Remember your password?
                      <Link to="/login"> Back to Login</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
