import React from "react";
import '../../app.css'
    
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Step1Basic = ({ nextStep }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Step 1: Basic Information</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          phone: Yup.string().required("Required"),
          dob: Yup.date().required("Required"),
          gender: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
        })}
        onSubmit={(values) => nextStep(values)}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">First Name</label>
                <Field
                  name="firstName"
                  placeholder="Enter first name"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Last Name</label>
                <Field
                  name="lastName"
                  placeholder="Enter last name"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Phone + DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Phone</label>
                <Field
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
                <Field
                  type="date"
                  name="dob"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Gender</label>
              <Field
                as="select"
                name="gender"
                className="w-full border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Address</label>
              <Field
                as="textarea"
                name="address"
                placeholder="Enter your address"
                className="w-full border rounded-lg p-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                Next →
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1Basic;
