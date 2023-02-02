/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import croix from "@assets/Vector.svg";

import { useCurrentResponsiveContext } from "../../contexts/responsiveContext";

import { useCurrentUserContext } from "../../contexts/userContext";

const backURL = import.meta.env.VITE_BACKEND_URL;

export default function RegisterForm() {
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    city: "",
    birthdate: "0",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const inputRef = useRef(null);
  const userId = useRef();

  const handleSubmitInfos = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userInfo.firstname !== "" &&
      userInfo.lastname !== "" &&
      userInfo.city !== "" &&
      userInfo.email !== "" &&
      userInfo.birthdate !== "" &&
      userInfo.password !== "" &&
      userInfo.password !== "" &&
      userInfo.password === userInfo.verifyPassword
    ) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        city: userInfo.city,
        birthdate: userInfo.birthdate,
        pseudo: userInfo.pseudo,
        email: userInfo.email,
        password: userInfo.password,
      });

      const formData = new FormData();

      formData.append("photo", inputRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const userRegistration = await fetch(
        `${backURL}/api/register`,
        requestOptions
      )
        .then((result) => result.json())
        .then((data) => (userId.current = data.insertId));
      const pictureCreation = await axios.post(
        `${backURL}/api/photos/${userId.current}`,
        formData
      );
      navigate("/login");
    }
  };

  return (
    <div>
      {isMobile && (
        <div className="flex flex-col justify-center items-center h-auto min-h-screen">
          <form
            className="flex flex-wrap flex-col rounded-xl w-[85%] max-w-[22rem] font-gotham font-semibold p-4"
            onSubmit={handleSubmitInfos}
          >
            <h2 className="text-3xl self-center">Créé ton compte :</h2>
            <label className="h-6 mt-4">Prénom:</label>
            <input
              className="bg-slate-100 pl-2 shadow-lg h-10 rounded-xl"
              type="text"
              name="firstname"
              placeholder="Ton prénom"
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstname: e.target.value })
              }
            />
            <label className="h-6 mt-4">Nom:</label>
            <input
              className="bg-slate-100 pl-2 shadow-lg h-10 rounded-xl"
              type="text"
              name="lastname"
              placeholder="Ton nom"
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastname: e.target.value })
              }
            />
            <label className="h-6 mt-4">Ville:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="text"
              name="city"
              placeholder="Ta ville"
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
            />
            <label className="h-6 mt-4">Date de naissance:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="date"
              name="birthdate"
              onChange={(e) =>
                setUserInfo({ ...userInfo, birthdate: e.target.value })
              }
            />
            <label className="h-6 mt-4">Email:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="email"
              name="email"
              placeholder="Ton adresse email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <label className="h-6 mt-4">Mot de passe:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="password"
              name="password"
              placeholder="Ton mot de passe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
            <label className="h-6 mt-4">Confirmer le mot de passe:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="password"
              name="password"
              placeholder="Tape le même mot de passe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, verifyPassword: e.target.value })
              }
            />
          </form>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col justify-center"
          >
            <h2 className="text-xl self-center mt-8">Ajoute une photo :</h2>
            <div className="flex flex-wrap w-[80%] justify-around self-center">
              <label
                htmlFor="upload-photo"
                className="cursor-pointer flex justify-center items-center bg-slate-200 shadow-lg h-60 w-60 rounded-xl my-2"
              >
                <img src={croix} alt="A plus" />
              </label>
              <input
                className="bg-opacity-0 absolute z-[-1]"
                id="upload-photo"
                type="file"
                name="photo"
                ref={inputRef}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, photo1: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-2 px-4 py-2 mb-4 rounded-full font-gotham text-2xl  bg-white justify-self-end"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      )}
      {isLittleMobile && (
        <div className="flex flex-col justify-center items-center h-auto min-h-screen">
          <form
            className="flex flex-wrap flex-col rounded-xl w-[85%] max-w-[22rem] font-gotham font-semibold p-4"
            onSubmit={handleSubmitInfos}
          >
            <h2 className="text-3xl self-center">Créé ton compte :</h2>
            <label className="h-6 mt-4">Prénom:</label>
            <input
              className="bg-slate-100 pl-2 shadow-lg h-10 rounded-xl"
              type="text"
              name="firstname"
              placeholder="Ton prénom"
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstname: e.target.value })
              }
            />
            <label className="h-6 mt-4">Nom:</label>
            <input
              className="bg-slate-100 pl-2 shadow-lg h-10 rounded-xl"
              type="text"
              name="lastname"
              placeholder="Ton nom"
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastname: e.target.value })
              }
            />
            <label className="h-6 mt-4">Ville:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="text"
              name="city"
              placeholder="Ta ville"
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
            />
            <label className="h-6 mt-4">Date de naissance:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="date"
              name="birthdate"
              onChange={(e) =>
                setUserInfo({ ...userInfo, birthdate: e.target.value })
              }
            />
            <label className="h-6 mt-4">Email:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="email"
              name="email"
              placeholder="Ton adresse email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <label className="h-6 mt-4">Mot de passe:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="password"
              name="password"
              placeholder="Ton mot de passe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
            <label className="h-6 mt-4">Confirmer le mot de passe:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="password"
              name="password"
              placeholder="Tape le même mot de passe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, verifyPassword: e.target.value })
              }
            />
          </form>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col justify-center"
          >
            <h2 className="text-xl self-center mt-8">Ajoute une photo :</h2>
            <div className="flex flex-wrap w-[80%] justify-around self-center">
              <label
                htmlFor="upload-photo"
                className="cursor-pointer flex justify-center items-center bg-slate-200 shadow-lg h-60 w-60 rounded-xl my-2"
              >
                <img src={croix} alt="A plus" />
              </label>
              <input
                className="bg-opacity-0 absolute z-[-1]"
                id="upload-photo"
                type="file"
                name="photo"
                ref={inputRef}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, photo1: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-2 px-4 py-2 mb-4 rounded-full font-gotham text-2xl  bg-white justify-self-end"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      )}
      {isTablet && (
        <div className="flex flex-col justify-center items-center h-auto min-h-screen">
          <form
            className="flex flex-wrap flex-col rounded-xl w-[85%] max-w-[22rem] font-gotham font-semibold p-4"
            onSubmit={handleSubmitInfos}
          >
            <h2 className="text-3xl self-center">Créé ton compte :</h2>
            <label className="h-6 mt-4">Prénom:</label>
            <input
              className="bg-slate-100 pl-2 shadow-lg h-10 rounded-xl"
              type="text"
              name="firstname"
              placeholder="Ton prénom"
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstname: e.target.value })
              }
            />
            <label className="h-6 mt-4">Nom:</label>
            <input
              className="bg-slate-100 pl-2 shadow-lg h-10 rounded-xl"
              type="text"
              name="lastname"
              placeholder="Ton nom"
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastname: e.target.value })
              }
            />
            <label className="h-6 mt-4">Ville:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="text"
              name="city"
              placeholder="Ta ville"
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
            />
            <label className="h-6 mt-4">Date de naissance:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="date"
              name="birthdate"
              onChange={(e) =>
                setUserInfo({ ...userInfo, birthdate: e.target.value })
              }
            />
            <label className="h-6 mt-4">Email:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="email"
              name="email"
              placeholder="Ton adresse email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <label className="h-6 mt-4">Mot de passe:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="password"
              name="password"
              placeholder="Ton mot de passe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
            <label className="h-6 mt-4">Confirmer le mot de passe:</label>
            <input
              className="bg-slate-100 pl-2  shadow-lg h-10 rounded-xl"
              type="password"
              name="password"
              placeholder="Tape le même mot de passe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, verifyPassword: e.target.value })
              }
            />
          </form>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col justify-center"
          >
            <h2 className="text-xl self-center mt-8">Ajoute une photo :</h2>
            <div className="flex flex-wrap w-[80%] justify-around self-center">
              <label
                htmlFor="upload-photo"
                className="cursor-pointer flex justify-center items-center bg-slate-200 shadow-lg h-60 w-60 rounded-xl my-2"
              >
                <img src={croix} alt="A plus" />
              </label>
              <input
                className="bg-opacity-0 absolute z-[-1]"
                id="upload-photo"
                type="file"
                name="photo"
                ref={inputRef}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, photo1: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-2 px-4 py-2 mb-4 rounded-full font-gotham text-2xl  bg-white justify-self-end"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      )}
      {isDesktop && (
        <div className="w-full px-4 mt-16 rounded-3xl shadow-2xl border-slate-400 border-2 bg-white h-full flex items-center">
          <div className="flex flex-col justify-center items-center h-fit">
            <h2 className="text-3xl self-center ">Créé ton compte :</h2>

            <div className="flex items-center justify-around">
              <form
                className="flex flex-wrap flex-col rounded-xl w-[85%] max-w-[22rem] font-gotham font-semibold p-4"
                onSubmit={handleSubmitInfos}
              >
                <label htmlFor="firstname" className="h-6 mt-4">
                  Prénom:
                </label>
                <input
                  className="bg-slate-200 pl-2 shadow-lg h-10 rounded-xl"
                  type="text"
                  name="firstname"
                  placeholder="Ton prénom"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstname: e.target.value })
                  }
                />
                <label htmlFor="lastname" className="h-6 mt-4">
                  Nom:
                </label>
                <input
                  className="bg-slate-200 pl-2 shadow-lg h-10 rounded-xl"
                  type="text"
                  name="lastname"
                  placeholder="Ton nom"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastname: e.target.value })
                  }
                />
                <label htmlFor="city" className="h-6 mt-4">
                  Ville:
                </label>
                <input
                  className="bg-slate-200 pl-2  shadow-lg h-10 rounded-xl"
                  type="text"
                  name="city"
                  placeholder="Ta ville"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, city: e.target.value })
                  }
                />
                <label htmlFor="birthdate" className="h-6 mt-4">
                  Date de naissance:
                </label>
                <input
                  className="bg-slate-200 pl-2  shadow-lg h-10 rounded-xl"
                  type="date"
                  name="birthdate"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, birthdate: e.target.value })
                  }
                />
                <label htmlFor="email" className="h-6 mt-4">
                  Email:
                </label>
                <input
                  className="bg-slate-200 pl-2  shadow-lg h-10 rounded-xl"
                  type="email"
                  name="email"
                  placeholder="Ton adresse email"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
                <label htmlFor="password" className="h-6 mt-4">
                  Mot de passe:
                </label>
                <input
                  className="bg-slate-200 pl-2  shadow-lg h-10 rounded-xl"
                  type="password"
                  name="password"
                  placeholder="Ton mot de passe"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                <label htmlFor="verifyPassword" className="h-6 mt-4">
                  Confirmer le mot de passe:
                </label>
                <input
                  className="bg-slate-200 pl-2  shadow-lg h-10 rounded-xl"
                  type="password"
                  name="verifyPassword"
                  placeholder="Tape le même mot de passe"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, verifyPassword: e.target.value })
                  }
                />
              </form>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="w-[80%] ml-8 flex flex-col items-center"
              >
                <h2 className="text-xl mt-8">Ajoute une photo :</h2>
                <div className="flex flex-wrap  justify-around self-center">
                  <label
                    htmlFor="upload-photo"
                    className="cursor-pointer flex justify-center items-center bg-slate-200  shadow-lg h-[22rem] w-[22rem] rounded-xl my-2"
                  >
                    <img src={croix} alt="A plus" />
                  </label>
                  <input
                    className="bg-opacity-0 absolute z-[-1]"
                    id="upload-photo"
                    type="file"
                    name="photo"
                    ref={inputRef}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, photo1: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-28 px-8 py-4 rounded-full font-gotham text-4xl  bg-slate-200 justify-self-end"
                  >
                    Valider
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
