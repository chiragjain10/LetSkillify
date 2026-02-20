import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Step2Parents = ({ nextStep, prevStep }) => {
  return (
    <Formik
      initialValues={{
        fatherName: "",
        motherName: "",
        fatherOccupation: "",
        motherOccupation: "",
        parentPhone: "",
        parentEmail: "",
      }}
      validationSchema={Yup.object({
        fatherName: Yup.string().required("Required"),
        motherName: Yup.string().required("Required"),
        fatherOccupation: Yup.string().required("Required"),
        motherOccupation: Yup.string().required("Required"),
        parentPhone: Yup.string().required("Required"),
        parentEmail: Yup.string().email("Invalid email").required("Required"),
      })}
      onSubmit={(values) => nextStep(values)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Field name="fatherName" placeholder="Father's Name" className="border p-2 w-full rounded" />
              <ErrorMessage name="fatherName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="motherName" placeholder="Mother's Name" className="border p-2 w-full rounded" />
              <ErrorMessage name="motherName" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Field name="fatherOccupation" placeholder="Father's Occupation" className="border p-2 w-full rounded" />
              <ErrorMessage name="fatherOccupation" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="motherOccupation" placeholder="Mother's Occupation" className="border p-2 w-full rounded" />
              <ErrorMessage name="motherOccupation" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Field name="parentPhone" placeholder="Parent's Phone" className="border p-2 w-full rounded" />
              <ErrorMessage name="parentPhone" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="parentEmail" placeholder="Parent's Email" className="border p-2 w-full rounded" />
              <ErrorMessage name="parentEmail" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Step2Parents;
