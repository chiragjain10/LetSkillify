// src/Pages/SignUp.jsx
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumbs from "../Breadcums";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { State, City } from "country-state-city";
import bcrypt from "bcryptjs";

const today = new Date();

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneno: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  whatsappno: Yup.string().matches(/^\d{10}$/, "WhatsApp number must be exactly 10 digits").required("WhatsApp number is required"),
  dob: Yup.date().max(today, "Date of birth cannot be later than today").required("Date of birth is required"),
  gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
  address: Yup.string().min(10, "Address must be at least 10 characters").required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().matches(/^\d{6}$/, "Pincode must be exactly 6 digits").required("Pincode is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  designation: Yup.string().required("Designation is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const initialValues = {
  name: "",
  email: "",
  phoneno: "",
  whatsappno: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  password: "",
  designation: "",
  terms: false,
};

function SignUp() {
  const navigate = useNavigate();
  const [Error, setError] = useState(null);
  const [Successmsg, setSuccessmsg] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  const handleStateChange = (e, setFieldValue) => {
    const stateCode = e.target.value;
    setFieldValue("state", stateCode);

    const citiesData = City.getCitiesOfState("IN", stateCode);
    setCities(citiesData);
    setFieldValue("city", ""); // reset city on state change
  };

  async function mySubmit(values, { setSubmitting }) {
    try {
      setError(null);

      // Hash password
      const hashedPassword = await bcrypt.hash(values.password, 10);

      // Save all user details in Firestore
      await addDoc(collection(db, "users"), {
        name: values.name,
        email: values.email,
        phoneno: values.phoneno,
        whatsappno: values.whatsappno,
        dob: values.dob,
        gender: values.gender,
        address: values.address,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        designation: values.designation,
        password: hashedPassword,
        createdAt: new Date(),
      });

      // Save cookie (optional)
      const cookieData = {
        email: values.email,
        designation: values.designation,
      };
      Cookies.set("SignupData", JSON.stringify(cookieData), { expires: 7, path: "/" });

      setSuccessmsg(true);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError(err.message);
      console.error("Firestore Error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Breadcrumbs />
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
        <div className="row">
          {/* ---------- Left Section ---------- */}
          <div className="col-12 text-center p-5 py-5">
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>SIGN UP</span>
              <span className="badge-dot"></span>
            </div>
            <h2 className="mb-2">Sign up for your account!</h2>
            <p className="lead mb-2">
              Nice to see you! Please fill in the details to sign up.
            </p>
          </div>

          {/* Left Video Section */}
          <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 position-relative overflow-hidden">
            <div className="video-background">
              <video autoPlay muted loop playsInline className="background-video">
                <source src="/assets/videos/Wallpaper-2.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay"></div>
            </div>
            <div className="p-0 p-lg-5 position-relative z-1 text-center">
              <h2 className="fw-bold text-white">Welcome to our largest Community</h2>
              <p className="mb-0 h6 fw-light text-white">Let's learn something new today!</p>
            </div>
          </div>

          {/* ---------- Signup Form ---------- */}
          <div className="col-12 col-lg-6 m-auto">
            <div className="row my-5">
              <div className="col-sm-10 col-xl-11 m-auto col-10">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={mySubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      {/* Name */}
                      <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name *</label>
                        <Field type="text" className="form-control" name="name" placeholder="Enter your Name" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </div>

                      {/* Gender + DOB */}
                      <div className="row d-flex">
                        <div className="col">
                          <label className="form-label">Gender *</label>
                          <div className="border p-2 rounded">
                            <Field type="radio" name="gender" value="male" id="male" />
                            <label htmlFor="male">&nbsp; Male</label>
                            <Field type="radio" name="gender" value="female" id="female" className="ms-3" />
                            <label htmlFor="female">&nbsp; Female</label>
                            <Field type="radio" name="gender" value="other" id="other" className="ms-3" />
                            <label htmlFor="other">&nbsp; Other</label>
                          </div>
                          <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                        <div className="col">
                          <label htmlFor="dob" className="form-label">Date of Birth *</label>
                          <Field type="date" className="form-control" name="dob" />
                          <ErrorMessage name="dob" component="div" className="text-danger" />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mb-2 mt-2">
                        <label htmlFor="address" className="form-label">Full Address *</label>
                        <Field type="text" name="address" className="form-control" placeholder="Full address" />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                      </div>

                      {/* Whatsapp + Contact */}
                      <div className="row d-flex">
                        <div className="col">
                          <label htmlFor="whatsappno" className="form-label">Whatsapp No. *</label>
                          <Field type="text" className="form-control" name="whatsappno" placeholder="Enter Whatsapp number" />
                          <ErrorMessage name="whatsappno" component="div" className="text-danger" />
                        </div>
                        <div className="col">
                          <label htmlFor="phoneno" className="form-label">Contact No. *</label>
                          <Field type="text" className="form-control" name="phoneno" placeholder="Enter your contact number" />
                          <ErrorMessage name="phoneno" component="div" className="text-danger" />
                        </div>
                      </div>

                      {/* State */}
                      <div className="mb-2">
                        <label htmlFor="state" className="form-label">State *</label>
                        <Field as="select" name="state" className="form-select"
                          onChange={(e) => handleStateChange(e, setFieldValue)}>
                          <option value="">Select State</option>
                          {states.map((st) => (
                            <option key={st.isoCode} value={st.isoCode}>{st.name}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="state" component="div" className="text-danger" />
                      </div>

                      {/* City */}
                      <div className="mb-2">
                        <label htmlFor="city" className="form-label">City *</label>
                        <Field as="select" name="city" className="form-select"
                          onChange={(e) => setFieldValue("city", e.target.value)}>
                          <option value="">Select City</option>
                          {cities.map((ct) => (
                            <option key={ct.name} value={ct.name}>{ct.name}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="city" component="div" className="text-danger" />
                      </div>

                      {/* Pincode */}
                      <div className="mb-2">
                        <label htmlFor="pincode" className="form-label">Pincode *</label>
                        <Field type="text" className="form-control" name="pincode" placeholder="Enter your Pincode" />
                        <ErrorMessage name="pincode" component="div" className="text-danger" />
                      </div>

                      {/* Email */}
                      <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email address *</label>
                        <Field type="email" className="form-control" name="email" placeholder="Enter your email" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>

                      {/* Password */}
                      <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password *</label>
                        <Field type="password" className="form-control" name="password" placeholder="Enter your password" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>

                      {/* Designation */}
                      <div className="mb-2">
                        <label className="form-label">Designation *</label>
                        <Field as="select" name="designation" className="form-select">
                          <option value="">Select Designation</option>
                          <option value="teacher">As a Teacher</option>
                          <option value="student">As a Student</option>
                          <option value="intern">As an Intern</option>
                          <option value="user">As a User</option>
                        </Field>
                        <ErrorMessage name="designation" component="div" className="text-danger" />
                      </div>

                      {/* Terms */}
                      <div className="mb-2">
                        <div className="form-check">
                          <Field type="checkbox" className="form-check-input" id="terms" name="terms" />
                          <label className="form-check-label" htmlFor="terms">
                            By signing up, you agree to the{" "}
                            <Link to={"/term&Condition"}>terms of service</Link>
                          </label>
                        </div>
                        <ErrorMessage name="terms" component="div" className="text-danger" />
                      </div>

                      {/* Submit */}
                      <div className="d-grid mt-3">
                        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

                <div className="mt-4 text-center">
                  <span>
                    Already have an account? <Link to={"/login"}> Sign in here</Link>
                  </span>
                </div>

                {Successmsg && (
                  <div className="alert alert-success mt-3 text-center">
                    <strong>Success!</strong> Thank you for signing up.
                  </div>
                )}
                {Error && (
                  <div className="alert alert-danger mt-3 text-center">{Error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
