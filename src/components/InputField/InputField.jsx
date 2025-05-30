import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { IoIosArrowDropdown } from "react-icons/io";

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  required = true,
  icon: Icon,
  error,
  options,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="relative w-full">
        {Icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <Icon />
          </span>
        )}

        {type === "select" ? (
          <select
            value={value}
            onChange={onChange}
            required={required}
            className="appearance-none pl-10 pr-10 md:bg-transparent bg-white w-full block outline-gray-200 text-[16px] md:text-sm h-13 text-gray-700 outline rounded-[50px] px-4 py-2"
          >
            <option value="" disabled hidden>
              Select {label}
            </option>
            {options?.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={label}
            className="pl-10 pr-10 md:bg-transparent bg-white w-full block outline-gray-200 text-[16px] md:text-sm h-13 text-gray-700 outline rounded-[50px] px-4 py-2"
          />
        )}

        {isPassword && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer z-10"
          >
            {showPassword ? <IoMdEye /> : <LuEyeClosed />}
          </span>
        )}
        {type === "select" && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <IoIosArrowDropdown />
          </span>
        )}
      </div>

      {error && (
        <p className="w-full text-sm text-red-400 md:text-red-500 mt-1 px-3">
          {error}
        </p>
      )}
    </div>
  );
}
