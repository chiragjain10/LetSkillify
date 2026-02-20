import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Breadcums from "../Breadcums";
import { Helmet } from "react-helmet-async";

function ContactUs() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    contactMode: "",
    intrestedIn: "",
    skillLevel: "",
    query: "",
    heardFrom: "",
    contactTime: "",
  };

  // const [response, setResponse] = useState('');
  const [Error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 5 characters long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    contactMode: Yup.string().required("Contact mode is required"),
    intrestedIn: Yup.string().required("Interested is required"),
    skillLevel: Yup.string().required("Skill Level is required"),
    query: Yup.string().required("Query is required"),
    heardFrom: Yup.string().required("How did you hear about us? is required "),
    contactTime: Yup.string().required("Contact time is required"),
  });

  const onSubmit = (val) => {
    console.log(val);
    // API disabled: simulate local success
    setError("Thank you for contacting us. We will get back to you soon.");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <Breadcums />
      <Helmet>
        <title>Contact Us – Get in Touch with Our Team</title>
        <meta
          name="description"
          content="Have questions? Contact us today to learn more about our Full Stack Development training and career opportunities."
        />
        <meta
          name="keywords"
          content="Contact, Get in Touch, Web Development Training, Full Stack Course, IT Career, Coding Support"
        />
        <meta
          property="og:title"
          content="Contact Us – Get in Touch with Our Team"
        />
        <meta
          property="og:description"
          content="Reach out to us for any inquiries about Full Stack Development training, courses, or career guidance."
        />
        <meta
          property="og:image"
          content="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        />
        <meta property="og:url" content="https://letskillfy.com/contact" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Contact Us – Get in Touch with Our Team"
        />
        <meta
          name="twitter:description"
          content="We are here to help! Contact us for more details about our web development training."
        />
        <meta
          name="twitter:image"
          content="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section
        className="pt-5 pb-0"
        style={{
          backgroundImage: "url(/images/element/map.svg)",
          backgroundPosition: "center left",
          backgroundSize: "cover",
        }}
      >
        {/* <div className="crumina-stunning-header section-image-bg-moon py-5" style={{ background: 'url(https://cdn.pixabay.com/photo/2016/11/21/18/14/wall-1846965_1280.jpg)' }}>
                    <div className="container">
                        <div className="stunning-header-content align-center" >
                            <h1 className="page-title text-white text-center">Contact Information</h1>
                            <div className="crumina-breadcrumbs">

                            </div>
                        </div>
                    </div>
                </div> */}

        <div className="container py-5">
          <div>
            <h2 className="text-center my-5">We’re here to help!</h2>
          </div>
          <div className="row g-4">
            {/* Customer Support Card */}
            <div className="col-lg-4">
              <div
                className="card  rounded-4 h-100"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "2px solid #066ac9",
                  borderRadius: "8px",
                }}
              >
                <div className="card-body py-5 ">
                  <h5 className="card-title text-dark mb-4 font-weight-bold text-center">
                    Customer Support
                  </h5>
                  <p className="text-dark mb-4">
                    Get in touch with us for assistance
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <a
                        href="mailto:info@letskillify.com"
                        style={{
                          color: "black",
                          textDecoration: "none",
                          fontSize: "16px",
                          display: "flex",

                          padding: "8px",
                          borderRadius: "4px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                      >
                        <i className="fas fa-envelope me-2 mt-1"></i>{" "}
                        info@letskillify.com
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:enquiry@letskillify.com"
                        style={{
                          color: "black",
                          textDecoration: "none",
                          fontSize: "16px",
                          display: "flex",

                          padding: "8px",
                          borderRadius: "4px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                      >
                        <i className="fas fa-envelope me-2 mt-1"></i>{" "}
                        enquiry@letskillify.com
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:contact@letskillify.com"
                        style={{
                          color: "black",
                          textDecoration: "none",
                          fontSize: "16px",
                          display: "flex",

                          padding: "8px",
                          borderRadius: "4px",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                      >
                        <i className="fas fa-envelope me-2 mt-1"></i>{" "}
                        contact@letskillify.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Contact Address Card */}
            <div className="col-lg-4">
              <div
                className="card  rounded-4 h-100"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "2px solid #066ac9",
                  borderRadius: "8px",
                }}
              >
                <div className="card-body py-5">
                  <h5 className="card-title text-center mb-4">
                    Contact Address
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <a
                        href="#"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-map-marker-alt me-2"></i>211, Trade
                        House, above HDFC Bank, Dhakkanwala Kua, South Tukoganj,
                        Indore (M.P) – 452007.
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="tel:+917987841662"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-phone-alt me-2"></i> +91 7987841662
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:info@letskillify.com"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-envelope me-2"></i>{" "}
                        info@letskillify.com
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:enquiry@letskillify.com"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-envelope me-2"></i>{" "}
                        enquiry@letskillify.com
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:contact@letskillify.com"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-envelope me-2"></i>{" "}
                        contact@letskillify.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Main Office Address Card */}
            <div className="col-lg-4">
              <div
                className="card  rounded-4 h-100"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "2px solid #066ac9",
                  borderRadius: "8px",
                }}
              >
                <div className="card-body py-5">
                  <h5 className="card-title text-center mb-4">
                    Main Office Address
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <a
                        href="#"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-map-marker-alt me-2"></i> F 30/31,
                        First Floor, A Wing, Express Zone Mall, Off. W E
                        Highway, Near Oberoi Signal, Goregaon East, Mumbai –
                        400063
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="tel:+917987841662"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-phone-alt me-2"></i> +91 7987841662
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:info@letskillify.com"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-envelope me-2"></i>{" "}
                        info@letskillify.com
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:enquiry@letskillify.com"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-envelope me-2"></i>{" "}
                        enquiry@letskillify.com
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        href="mailto:contact@letskillify.com"
                        style={{ color: "#333", textDecoration: "none" }}
                      >
                        <i className="fas fa-envelope me-2"></i>{" "}
                        contact@letskillify.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="">
          <div className="row g-4 g-lg-0 align-items-center mx-4">
            <div className="mb-2">
              <h2 className="mt-4 mt-md-0 text-center letskillify-title">Let's talk</h2>
              <p className=" text-center">
                To request a quote or want to meet up for coffee, contact us
                directly or fill out the form and we will get back to you
                promptly
              </p>
            </div>
            <div className="col-md-5 mx-auto">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid rounded shadow-sm"
                alt="Sample image"
              />
              <div className="d-sm-flex align-items-center justify-content-center mt-3 flex-wrap">
                <h5 className="mb-2">Follow us on:</h5>
                <ul className="list-inline mb-0 ms-sm-3">
                  <li className="list-inline-item">
                    <a
                      className="fs-5 me-2 text-facebook"
                      href="#"
                      aria-label="Facebook"
                    >
                      <i className="fab fa-fw fa-facebook-square"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="fs-5 me-2 text-instagram"
                      href="#"
                      aria-label="Instagram"
                    >
                      <i className="fab fa-fw fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="fs-5 me-2 text-twitter"
                      href="#"
                      aria-label="Twitter"
                    >
                      <i className="fab fa-fw fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="fs-5 me-2 text-linkedin"
                      href="#"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-fw fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="fs-5 me-2 text-dribbble"
                      href="#"
                      aria-label="Dribbble"
                    >
                      <i className="fas fa-fw fa-basketball-ball"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="fs-5 me-2 text-pinterest"
                      href="#"
                      aria-label="Pinterest"
                    >
                      <i className="fab fa-fw fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 mx-auto">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form className="p-4 ls-contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        name="name"
                        placeholder="Enter your first name"
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone *
                      </label>
                      <Field
                        type="tel"
                        className="form-control form-control-lg"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                      />

                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
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
                    <div className="col-md-6 mb-3">
                      <label htmlFor="contactMode" className="form-label">
                        Preferred Mode of Contact *
                      </label>
                      <Field
                        as="select"
                        required
                        className="form-control form-control-lg form-select"
                        aria-label="Default select example"
                        id="contactMode"
                        name="contactMode"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Phone_call" name="contactMode">
                          Phone Call
                        </option>
                        <option value="Email" name="contactMode">
                          Email
                        </option>
                        <option value="WhatsApp" name="contactMode">
                          WhatsApp
                        </option>
                      </Field>

                      <ErrorMessage
                        name="contactMode"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="intrestedIn" className="form-label">
                        Interested In *
                      </label>
                      <Field
                        as="select"
                        required
                        className="form-control form-control-lg form-select"
                        id="intrestedIn"
                        name="intrestedIn"
                      >
                        <option value="" label="Select" />
                        <option value="Web_Development">Web Development</option>
                        <option value="Graphic_Design">Graphic Design</option>
                        <option value="UI_UX">UI/UX</option>
                        <option value="Finance">Finance</option>
                        <option value="Laws">Laws</option>
                      </Field>

                      <ErrorMessage
                        name="intrestedIn"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="skillLevel" className="form-label">
                        Current Skill Level *
                      </label>
                      <Field
                        as="select"
                        required
                        className="form-control form-control-lg form-select"
                        aria-label="Default select example"
                        id="skillLevel"
                        name="skillLevel"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Field>

                      <ErrorMessage
                        name="skillLevel"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="query" className="form-label">
                      Message or Specific Query *
                    </label>
                    <div className="form-floating">
                      <Field
                        as="textarea"
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="query"
                        style={{ height: "100px" }}
                        name="query"
                      ></Field>
                      <label htmlFor="floatingTextarea2">Message</label>
                    </div>

                    <ErrorMessage
                      name="query"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="row">
                    <div className=" col-md-6 mb-3">
                      <label htmlFor="hearedFrom" className="form-label">
                        How Did You Hear About Us? *
                      </label>
                      <Field
                        as="select"
                        required
                        className="form-control form-control-lg form-select"
                        aria-label="Default select example"
                        id="heardFrom"
                        name="heardFrom"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Google Search">Google Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend/Referral">Friend/Referral</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Other">Other</option>
                      </Field>

                      <ErrorMessage
                        name="hearedFrom"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className=" col-md-6 mb-3">
                      <label htmlFor="contactTime" className="form-label">
                        Preferred Time for Contact *
                      </label>
                      <Field
                        as="select"
                        required
                        className="form-control form-control-lg form-select"
                        aria-label="Default select example"
                        id="contactTime"
                        name="contactTime"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Morning (9 AM - 12 PM)">
                          Morning (9 AM - 12 PM)
                        </option>
                        <option value="Afternoon (12 PM - 3 PM)">
                          Afternoon (12 PM - 3 PM)
                        </option>
                        <option value="Evening (3 PM - 6 PM)">
                          Evening (3 PM - 6 PM)
                        </option>
                      </Field>

                      <ErrorMessage
                        name="contactTime"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="agreeToTerms" className="form-label">
                      Agree to Terms & Conditions
                    </label>
                    <Field
                      type="checkbox"
                      id="agreeToTerms"
                      // name="agreeToTerms"
                      className="ms-2"
                    />
                    <ErrorMessage
                      name="agreeToTerms"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <p
                    className={`text-center p-2  ${
                      Error ===
                      "Thank you for contacting us. We will get back to you soon."
                        ? "border text-success rounded"
                        : " text-danger"
                    }`}
                  >
                    {Error}
                  </p>
                  <div className="d-grid">
                    <button
                      className="btn btn-lg btn-primary mb-0"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              <iframe
                className="w-100 h-400px rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.284025963208!2d75.8780992!3d22.7176822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdafe58cd973%3A0x44809095ad1a1bf!2sLetSkillify!5e0!3m2!1sen!2sin!4v1740834649747!5m2!1sen!2sin"
                height="500"
                style={{ border: "0"}}
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ContactUs;
