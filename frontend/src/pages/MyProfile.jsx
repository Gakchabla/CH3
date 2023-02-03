/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import isConnected from "../services/isConnected";
import { useCurrentUserContext } from "../contexts/userContext";
import ProfileHeader from "../components/profile/ProfileHeader";

const backURL = import.meta.env.VITE_BACKEND_URL;

export default function MyProfile() {
  const { user, token, setUser } = useCurrentUserContext();
  const inputRef = useRef();

  const navigate = useNavigate();

  const [photo, setPhoto] = useState([]);
  const [newDescription, setNewDescription] = useState(user.description);
  const [act, setAct] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const handleSubmit = async () => {
    if (inputRef.current.files[0]) {
      const formData = new FormData();
      formData.append("photo", inputRef.current.files[0]);

      const config = { headers: myHeaders };

      const changePhoto = await axios.put(
        `${backURL}/api/photos/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (newDescription !== user.description) {
      const body = JSON.stringify({ description: newDescription });
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body,
      };

      const changeDesc = await fetch(
        `${backURL}/api/description/${user.id}`,
        requestOptions
      );
    }
    setAct(act + 1);
  };

  useEffect(() => {
    fetch(`${backURL}/api/pictures/users/${user.id}`, { headers: myHeaders })
      .then((result) => {
        if (!isConnected(result)) {
          localStorage.clear();
          setUser("");
          navigate("/");
        }

        return result;
      })
      .then((result) => result.json())
      .then((result) => setPhoto(result));
  }, []);
  useEffect(() => {
    fetch(`${backURL}/api/pictures/users/${user.id}`, { headers: myHeaders })
      .then((result) => result.json())
      .then((result) => setPhoto(result));
  }, [act]);
  useEffect(() => {
    fetch(`${backURL}/api/users/${user.id}`, { headers: myHeaders })
      .then((result) => result.json())
      .then((result) => setNewDescription(result.description));
  }, []);

  const handleDelete = async () => {
    const deleteHeaders = new Headers({
      Authorization: `Bearer ${token}`,
    });

    const deleteUser = await fetch(`${backURL}/api/users/${user.id}`, {
      headers: deleteHeaders,
      method: "DELETE",
    });
    localStorage.clear();
    setUser("");
    navigate("/");
  };

  return (
    <div>
      {openModal && (
        <div className="w-screen h-screen bg-black/30 fixed z-30 top-0 flex flex-col justify-center items-center">
          <div className="w-[90%] h-[30vh] bg-[#eeee] rounded-2xl font-gotham font-semibold flex flex-wrap justify-center">
            {" "}
            <h2 className="text-3xl text-center mt-4">
              Es-tu sur de vouloir nous quitter?
            </h2>
            <div className="w-[50%] flex justify-between">
              <button
                type="button"
                className="text-xl"
                onClick={() => setOpenModal(false)}
              >
                Non
              </button>
              <button type="button" className="text-xl" onClick={handleDelete}>
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
      <ProfileHeader />
      <div className="flex flex-col items-center mt-2">
        <img
          src={photo[0] ? photo[0].picture_url : ""}
          alt={user.firstname}
          className="w-[90%]"
        />
        <label
          htmlFor="upload-photo"
          className="cursor-pointer flex justify-center items-center bg-slate-200 shadow-lg h-10 w-[90%] rounded-xl my-2"
        >
          Changer de photo
        </label>
        <input
          className="bg-opacity-0 absolute z-[-1]"
          id="upload-photo"
          type="file"
          name="photo"
          ref={inputRef}
        />
        <h2 className="w-[90%] font-gotham font-semibold text-2xl">{`Bienvenue ${user.firstname},
        `}</h2>
        <div>
          <label
            htmlFor="comment"
            className="w-[90%] font-gotham font-semibold"
          >
            {newDescription ? "Modifies ta bio :" : "Ecris ta bio :"}
            <br />
            <p className="text-sm">
              {newDescription
                ? `${300 - newDescription.length} caractères restants.`
                : "300 Caractères restants"}
            </p>
          </label>
          <div className="mt-1">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={newDescription}
              placeholder={newDescription}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setNewDescription(e.target.value);
                }
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-4 px-8 py-4 rounded-full font-gotham text-4xl  bg-slate-200 justify-self-end"
          onClick={handleSubmit}
        >
          Valider
        </button>
        <button
          type="button"
          className="mt-4 px-4 py-2 rounded-full font-gotham text-2xl  bg-slate-200 justify-self-end"
          onClick={() => setOpenModal(true)}
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}
