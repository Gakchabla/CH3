import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/userContext";

const backURL = import.meta.env.VITE_BACKEND_URL;

export default function LoginForm() {
  const { setUser, setToken } = useCurrentUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body,
    };

    if (email && password) {
      // on appelle le back
      fetch(`${backURL}/api/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUser(result.users);
          setToken(result.token);
          navigate("/match");
        })
        .catch(() => {
          setWrongCredentials(true);
          // eslint-disable-next-line no-unused-expressions
          console.error;
        });
    } else {
      console.warn("Please specify email or pseudo and password");
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-end h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col font-gotham font-semibold justify-around items-center bg-slate-100 shadow-2xl w-[90vw] max-w-[22rem]  border-slate-400 border-2 h-68 rounded-3xl"
        >
          <h2 className="text-3xl my-4">Connecte-toi!</h2>
          <div className="flex flex-col h-30 justify-between">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#4a39b5] h-10 my-2 rounded-2xl pl-4"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#4a39b5] h-10 my-2 rounded-2xl pl-4"
            />
            {wrongCredentials && (
              <p className="text-red-600">Mauvais identifiants!</p>
            )}
            <p>
              Pas encore inscrits?{" "}
              <NavLink to="/register" className="hover:text-slate-400">
                Inscrits-toi!
              </NavLink>
            </p>
          </div>
          <button
            type="submit"
            className="mt-2 px-4 py-2 mb-4 rounded-full font-gotham text-2xl  bg-slate-400 hover:bg-slate-300 justify-self-end"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
