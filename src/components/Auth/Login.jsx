// src/Pages/Login.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import Breadcrumbs from "../Breadcums";

function Login() {
  const navigate = useNavigate();
  const [Error, setError] = useState("");
  const [Successmsg, setSuccessmsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      // Query Firestore for user by email
      const q = query(collection(db, "users"), where("email", "==", values.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No user found with this email.");
      } else {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Compare password using bcrypt
        const passwordMatch = await bcrypt.compare(values.password, userData.password);
        if (!passwordMatch) {
          setError("Incorrect password.");
        } else {
          // Successful login
          const cookieData = {
            email: userData.email,
            designation: userData.designation,
          };
          Cookies.set("SignupData", JSON.stringify(cookieData), { expires: 7, path: "/" });
          setSuccessmsg(true);

          setTimeout(() => {
            switch (userData.designation) {
              case "admin":
                navigate("/adminpannel");
                break;
              case "student":
                navigate("/student_dash");
                break;
              case "teacher":
                navigate("/teacher_dash");
                break;
              case "developer":
                navigate("/developer_dash");
                break;
              case "intern":
                navigate("/intern_dash");
                break;
              default:
                navigate("/");
            }
            window.location.reload();
          }, 1500);
        }
      }
    } catch (err) {
      console.error("Firestore Error:", err);
      setError("Login failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Breadcrumbs />
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden my-5">
        <div className="container">
          <div className="row">
            {/* Left Section */}
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 position-relative overflow-hidden">
              <div className="video-background">
                <video autoPlay muted loop playsInline className="background-video">
                  <source src="/assets/videos/Wallpaper-2.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
              </div>
              <div className="p-3 p-lg-5 position-relative z-2 text-center text-white">
                <img src="/assets/images/element/02.svg" className="mt-5" alt="" />
                <h2 className="fw-bold text-white">Welcome Back</h2>
                <p className="mb-0 h6 text-white">Let’s learn something new today!</p>
              </div>
            </div>

            {/* Right Section (Form) */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-10 m-auto">
                  <h2 className="mb-4">Login to your account!</h2>
                  <p className="lead mb-4">Please sign in with your credentials.</p>

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

                        {/* Password */}
                        <div className="mb-4">
                          <label htmlFor="password" className="form-label">
                            Password *
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light border-0 text-secondary px-3">
                              <i className="fas fa-lock"></i>
                            </span>
                            <Field
                              type={showPassword ? "text" : "password"}
                              className="form-control border-0 bg-light ps-1"
                              placeholder="*********"
                              name="password"
                            />
                            <button
                              type="button"
                              className="input-group-text bg-light border-0 text-secondary"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                            </button>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* Success / Error */}
                        {Successmsg && (
                          <div className="alert alert-success mt-3 text-center">
                            <strong>Success!</strong> You are logged in.
                          </div>
                        )}
                        {Error && (
                          <div className="alert alert-danger mt-3 text-center">{Error}</div>
                        )}

                        {/* Submit */}
                        <div className="d-grid mt-3">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Login"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {/* Signup link */}
                  <div className="mt-4 text-center">
                    <span>
                      You don't know password?<Link to="/forgetpassword"> Forget Password</Link><br/>
                      Don’t have an account?<Link to="/signup"> Sign up here</Link> <br/>
                      Admin Login : <Link to="/adminlogin"> Admin</Link> 

                      <></>
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

export default Login;
