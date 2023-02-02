import RegisterForm from "@components/register/RegisterForm";
import React from "react";
import flamme from "../assets/LogoBleu.png";

export default function Register() {
  return (
    <div className="bg-gradient-to-b from-white to-[#8e7cff] h-auto lg:h-screen  lg:min-h-full w-screen">
      <div className="flex w-screen justify-center lg:justify-start items-center pt-10 lg:pt-4 lg:pl-2 ">
        {" "}
        <img src={flamme} className="w-14 mx-1" alt="Hackatinder logo" />
        <h2 className="text-5xl text-[#4a39b5] font-gothamTitle pt-2">
          Hackatinder
        </h2>
      </div>
      <div className="h-auto  lg:flex lg:justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
