import React, { useState } from "react";
import LeftPanel from "../components/LeftPanel/LeftPanel.jsx";
import RightPanel from "../components/RightPanel/RightPanel.jsx";
import FormGenerator from "../components/FormGenerator/FormGenerator.jsx";

import { FaUser, FaLock, FaBriefcase } from "react-icons/fa";
import { MdOutlineMail, MdOutlineAddLink } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { BsBuildingsFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepsConfig = [
    {
      title: "Hello!",
      subtitle: "Sign Up to Get Started",
      fields: [
        {
          label: "Full Name",
          key: "name",
          icon: FaUser,
          validation: {
            regex: /^[a-zA-Z\s]{2,}$/,
            message: "Please enter a valid full name (min 2 letters).",
          },
        },
        {
          label: "Email Address",
          key: "email",
          type: "email",
          icon: MdOutlineMail,
          validation: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address.",
          },
        },
        {
          label: "Phone Number",
          key: "phone",
          type: "tel",
          icon: LuPhoneCall,
          validation: {
            regex: /^[0-9]{10}$/,
            message: "Enter a valid 10-digit phone number.",
          },
        },
        {
          label: "Password",
          key: "password",
          type: "password",
          icon: FaLock,
          validation: {
            regex: /^(?=.*\d).{9,}$/,
            message:
              "Password must be at least 8 characters and include a number.",
          },
        },
      ],
    },
    {
      title: "Company Information",
      subtitle:
        "To tailor your experience, please share details about your organization",
      fields: [
        {
          label: "Company Name Eg: Walrus",
          key: "company_name",
          icon: FaBriefcase,
          validation: {
            regex: /^.{2,}$/,
            message: "Company name must be at least 2 characters.",
          },
        },
        {
          label: "Nature of Business Eg: Finance",
          key: "company_nature_of_business",
          icon: BsBuildingsFill,
          validation: {
            regex: /^.{2,}$/,
            message: "Please enter the nature of your business.",
          },
        },
        {
          label: "Company Revenue Eg: 300Cr",
          key: "company_size",
          icon: HiUserGroup,
          validation: {
            regex: /^\d+\s*(k|l|cr)?$/i,
            message: "Company revenue must be a number like 90L, 300Cr.",
          },
        },
        {
          label: "Company Website",
          key: "company_website",
          type: "url",
          icon: MdOutlineAddLink,
          validation: {
            regex:
              /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
            message: "Please enter a valid URL.",
          },
        },
      ],
    },
    {
      title: "Business Description",
      subtitle: "Give us context about your business, products, or services",
      fields: [{ label: "Business Description", key: "context" }],
    },
    {
      title: "Yay, You're all set!",
      subtitle: "Complete your signup to start using our services",
      fields: [],
    },
  ];

  return (
    <div className=" min-h-screen w-full flex">
      <LeftPanel />
      <RightPanel>
        <FormGenerator
          step={step}
          nextStep={nextStep}
          prevStep={prevStep}
          stepsConfig={stepsConfig}
        />
      </RightPanel>
    </div>
  );
}
