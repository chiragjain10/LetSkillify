import React, { useContext } from "react";
import { MainContext } from "./Cart/MainProvider";
import Model from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";


const EnquiryForm = () => {
  const { visible, setVisible } = useContext(MainContext);
  Model.setAppElement("#root");

  const EnquiryValues = {
    name: "",
    email: "",
    phoneno: "",
    subject: "",
    message: "",
  };

  const validateYupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Min 2 chars"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phoneno: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be 10 digits")
      .required("Phone required"),
    subject: Yup.string().required("Subject required"),
    message: Yup.string().required("Message required").min(10, "Min 10 chars"),
  });

  async function mySubmit(values, { resetForm }) {
    try {
      // 1. Save to Firebase
      await addDoc(collection(db, "enquiries"), {
        ...values,
        timestamp: new Date(),
      });

      // 2. Send Email (EmailJS used here)
      await sendEmail(values);

      alert("Enquiry submitted successfully!");
      resetForm();
      setVisible(false);
    } catch (error) {
      console.error("Error adding enquiry:", error);
      alert("Something went wrong. Try again!");
    }
  }

  // ✅ Email sending function
  async function sendEmail(values) {
    // Using EmailJS (no backend required)
    // 1. Install: npm install emailjs-com
    // 2. Create free account: https://www.emailjs.com
    // 3. Get Service ID, Template ID, and Public Key


    await emailjs.send(
      "service_zdyidsj",
      "template_ubq42os",
      {
        from_name: values.name,
        from_email: values.email,
        phone: values.phoneno,
        subject: values.subject,
        message: values.message,
      },
      "DbiAvWYvbqLm95ak-"
    );
  }

  return (
    <div>
      <Model isOpen={visible} onRequestClose={() => setVisible(false)}>
        <div className="row form-row">
          <div
            className="col-lg-6 side-img"
            style={{ backgroundColor: "#1bb3fd12" }}
          >
            <img
              src="assets/images/icon/form.webp"
              className="mt-6 pt-5"
              alt="Enquiry"
            />
          </div>
          <div className="col-lg-6 pe-0 mt-lg-4">
            <h3 className="mt-5 text-center">ENQUIRY FORM</h3>
            <p className="mb-4 text-center">Fill Your Details and Enquiry</p>

            <Formik
              initialValues={EnquiryValues}
              onSubmit={mySubmit}
              validationSchema={validateYupSchema}
            >
              <Form className="forms">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <Field
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label htmlFor="phoneno" className="form-label">
                      Phone Number *
                    </label>
                    <Field
                      type="tel"
                      className="form-control form-control-lg"
                      id="phoneno"
                      name="phoneno"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage
                      name="phoneno"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address *
                    </label>
                    <Field
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <Field
                      type="text"
                      className="form-control form-control-lg"
                      id="subject"
                      name="subject"
                      placeholder="Enter subject"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label htmlFor="message" className="form-label">
                      Your Message *
                    </label>
                    <Field
                      as="textarea"
                      className="form-control form-control-lg"
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                      rows="4"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mt-3 text-center mb-5">
                  <button
                    type="submit"
                    className="btn btn-primary me-3 px-4"
                  >
                    Submit Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="px-4 btn btn-outline-danger"
                  >
                    Close
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Model>
    </div>
  );
};

export default EnquiryForm;
