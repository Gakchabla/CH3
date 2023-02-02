import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/login/LoginForm";
import flamme from "../assets/Background.svg";
import { useCurrentUserContext } from "../contexts/userContext";

export default function Login() {
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) navigate("/match");
  }, []);

  return (
    <div className="bg-gradient-to-bl from-[#8e7cff] to-[#3d2f97] h-screen w-screen lg:h-screen  lg:min-h-full ">
      <div className="h-screen">
        <div className="flex w-screen justify-center lg:justify-start items-center pt-24 lg:pt-4 lg:pl-2 ">
          <img src={flamme} className="w-14 mx-1" alt="Hackatinder logo" />
          <h2 className="text-5xl text-white font-gothamTitle pt-2">
            Hackatinder
          </h2>
        </div>
        <div className="  lg:flex lg:justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
