import { useFormData } from "../context/FormContext";
import InputField from "./InputField";
import { useState } from "react";

export default function FormGenerator({
  step,
  nextStep,
  prevStep,
  stepsConfig,
}) {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    currentStep.fields.forEach(({ key, validation }) => {
      const value = formData[key] || "";
      if (validation?.regex && !validation.regex.test(value)) {
        newErrors[key] = validation.message;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      nextStep();
    }
  };

  const { formData, setFormData } = useFormData();

  const handleChange = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const onFinalSubmit = () => {
    console.log("Submitting:", formData);
    alert("Submitted! Redirecting...");
  };

  const currentStep = stepsConfig[step - 1];

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 left-0 mx-1">
        {currentStep.title}
      </h2>
      <p className="text-gray-500 text-sm mb-6 left-0 mx-1">
        {currentStep.subtitle}
      </p>

      {step < 4 ? (
        <form
          className="space-y-6 flex flex-col items-center"
          onSubmit={onSubmit}
        >
          {currentStep.fields.map(({ label, key, type, icon }) => (
            <InputField
              key={key}
              label={label}
              type={type}
              icon={icon}
              value={formData[key] || ""}
              onChange={handleChange(key)}
              error={errors[key]}
            />
          ))}

          <div className="flex w-full justify-center pt-4">
            {step > 1 ? (
              <div className="w-full flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white text-[#0575e6] border border-[#0575e6] px-4 py-2 rounded-[50px] hover:bg-[#0575e6] hover:border-0 hover:text-white transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#0575e6] text-white px-4 py-3 rounded-[50px] hover:bg-[#1e8cfa] transition"
                >
                  Continue
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#0575e6] text-white px-4 py-3 rounded-[50px] w-full hover:bg-[#1e8cfa] transition"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-6">[ Pricing plan UI goes here... ]</p>
          <div className="flex justify-between">
            <button onClick={prevStep} className="underline text-blue-600">
              Back
            </button>
            <button
              onClick={onFinalSubmit}
              className="bg-[#3E3EFF] text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
