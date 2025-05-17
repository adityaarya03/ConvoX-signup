import React from "react";
import "./RightPanel.css";

export default function RightPanel({ children }) {
  return (
    <div className="right-panel relative md:w-1/3 w-full bg-white flex flex-col justify-center items-center md:mx-[3em] px-16 py-20">
      <div className="md:hidden absolute h-12 w-12 top-6 left-6 flex items-center space-x-2 z-2">
        <img
          src="https://res.cloudinary.com/dhzaw6nix/image/upload/v1747386841/logo-final_e0hmcg.png"
          alt="Logo"
          className="rounded-xl"
        />
      </div>
      <div className="md:hidden absolute top-[-160px] left-[-160px] w-[400px] h-[400px] bg-[#02298a] rounded-full blur-xl opacity-40 animate-float-random z-0"></div>
      <div className="md:hidden absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-[#02298a] rounded-full blur-xl opacity-40 delay-300 animate-float-random-opposite z-0"></div>
      <div className="md:hidden absolute top-1/4 right-[-50px] w-[250px] h-[250px] bg-[#0b36a3] rounded-full blur-xl opacity-40 delay-500 animate-float-random z-0"></div>
      <div className="md:hidden absolute top-1/2 right-[-100px] w-[300px] h-[300px] blur-sm opacity-40 animate-float-random delay-700 z-0">
        <img
          src="https://res.cloudinary.com/dhzaw6nix/image/upload/v1747390694/chaty_n6jc9d.png"
          alt=""
        />
      </div>
      <div className="md:hidden absolute bottom-1/2 right-[300px] w-[200px] h-[200px] blur-sm opacity-50 animate-float-random-opposite delay-700 z-0">
        <img
          src="https://res.cloudinary.com/dhzaw6nix/image/upload/v1747403536/whitechatty_vcatro.png"
          alt=""
        />
      </div>
      {children}
    </div>
  );
}
