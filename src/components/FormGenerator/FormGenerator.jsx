import { useFormData } from "../../context/FormContext";
import InputField from "../InputField/InputField";
import { useState } from "react";
import ChatContextInput from "../ChatContextInput/ChatContextInput";
import jwtEncode from "jwt-encode";
import { useNavigate } from "react-router-dom";

export default function FormGenerator({
  step,
  nextStep,
  prevStep,
  stepsConfig,
}) {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const secret = import.meta.env.VITE_JWT_SECRET;
  const [final, setFinal] = useState(true);

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

  const onFinalSubmit = async () => {
    try {
      setFinal(false);
      const token = jwtEncode(formData, secret, { alg: "HS256" });

      const response = await fetch(
        "https://walrus.kalavishva.com/webhook/walrus_convox_signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFinal(true);
        window.location.href =
          "https://dashboard.heywalrus.in/app/convox-v1-0/login-682603059ec32534dc791ebd";
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup.");
    }
  };

  const currentStep = stepsConfig[step - 1];

  return (
    <>   
      <div className="md:w-6/7 w-11/12 z-1">
        <h2 className="text-2xl font-semibold text-white md:text-gray-800 left-0 mx-1">
          {currentStep.title}
        </h2>
        <p className="md:text-gray-500 text-white text-sm mb-6 left-0 mx-1">
          {currentStep.subtitle}
        </p>
      </div>

      {step === 3 ? (
        <ChatContextInput
          onSubmit={(value) => {
            setFormData({ ...formData, context: value });
            nextStep();
          }}
          onBack={prevStep}
        />
      ) : step < 4 ? (
        <form
          className="space-y-6 md:w-6/7 w-11/12 flex flex-col items-center z-1"
          onSubmit={onSubmit}
        >
          {currentStep.fields.map(({ label, key, type, icon, options }) => (
            <InputField
              key={key}
              label={label}
              type={type}
              icon={icon}
              value={formData[key] || ""}
              onChange={handleChange(key)}
              error={errors[key]}
              {...(options ? { options } : {})}
            />
          ))}

          <div className="flex w-full justify-center pt-4">
            {step > 1 ? (
              <div className="w-full flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white text-[#0575e6] h-13 border border-[#0575e6] px-4 py-2 rounded-[50px] hover:bg-[#0575e6] hover:border-0 hover:text-white transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#0575e6] text-white h-13 px-4 py-3 rounded-[50px] hover:bg-[#1e8cfa] transition"
                >
                  Continue
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#0575e6] text-white px-4 py-3 h-13 rounded-[50px] w-full hover:bg-[#1e8cfa] transition"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="md:w-6/7 w-11/12 z-1">
          <div className="flex justify-between w-full">
            <button
              onClick={prevStep}
              className="bg-white text-[#0575e6] h-13 border border-[#0575e6] px-4 py-2 rounded-[50px] hover:bg-[#0575e6] hover:border-0 hover:text-white transition"
            >
              Back
            </button>
            <button
              onClick={onFinalSubmit}
              className={`${final?"bg-[#0575e6]":"bg-[#1e8cfa]"} text-white h-13 px-4 py-3 rounded-[50px] hover:bg-[#1e8cfa] transition`}
            >
              {final ? "Complete" : "Submitting..."}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
