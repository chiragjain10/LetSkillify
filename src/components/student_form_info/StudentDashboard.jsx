import React, { useState } from "react";
import Step1Basic from "./student_basic";
import Step2Parents from "./Student_parent";
import Step3Education from "./Student_education";
const StudentDashboard2 = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      {step === 1 && <Step1Basic nextStep={nextStep} />}
      {step === 2 && <Step2Parents nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3Education prevStep={prevStep} formData={formData} />}
    </div>
  );
};

export default StudentDashboard2;
