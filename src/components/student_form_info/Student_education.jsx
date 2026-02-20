import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Step3Education = ({ prevStep, formData }) => {
  return (
    <Formik
      initialValues={{
        qualification: "",
        boardUniversity: "",
        specialization: "",
        percentage: "",
        passoutYear: "",
        additionalQualifications: [""],
      }}
      validationSchema={Yup.object({
        qualification: Yup.string().required("Required"),
        boardUniversity: Yup.string().required("Required"),
        specialization: Yup.string().required("Required"),
        percentage: Yup.string().required("Required"),
        passoutYear: Yup.string().required("Required"),
      })}
      onSubmit={async (values) => {
        try {
          await setDoc(doc(db, "students", auth.currentUser.uid), {
            ...formData,
            ...values,
          });
          alert("Profile Completed Successfully!");
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }}
    >
      {({ values }) => (
        <Form className="space-y-3">
          <Field as="select" name="qualification" className="border p-2 w-full rounded">
            <option value="">Select Last Qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
          </Field>
          <ErrorMessage name="qualification" component="div" className="text-red-500 text-sm" />

          <Field name="boardUniversity" placeholder="Board / University Name" className="border p-2 w-full rounded" />
          <ErrorMessage name="boardUniversity" component="div" className="text-red-500 text-sm" />

          <Field name="specialization" placeholder="Specialization" className="border p-2 w-full rounded" />
          <ErrorMessage name="specialization" component="div" className="text-red-500 text-sm" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Field name="percentage" placeholder="Percentage / Grade" className="border p-2 w-full rounded" />
              <ErrorMessage name="percentage" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field name="passoutYear" placeholder="Year of Passing" className="border p-2 w-full rounded" />
              <ErrorMessage name="passoutYear" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          {/* Additional Qualifications */}
          <FieldArray name="additionalQualifications">
            {({ push, remove }) => (
              <div>
                <label className="block font-semibold">Additional Qualifications</label>
                {values.additionalQualifications.map((_, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <Field
                      name={`additionalQualifications.${index}`}
                      placeholder="Qualification"
                      className="border p-2 w-full rounded"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push("")}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  + Add
                </button>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Back
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Step3Education;
