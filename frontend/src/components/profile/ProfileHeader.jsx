import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import profil from "../../assets/profil.svg";
import retour from "../../assets/return.svg";
import logout from "../../assets/logout.svg";
import { useCurrentUserContext } from "../../contexts/userContext";

export default function ProfileHeader() {
  const { setUser } = useCurrentUserContext();
  const navigate = useNavigate();
  return (
    <div className="h-[14vh] px-2 lg:h-[18vh] flex justify-between  items-end border-b-2 border-gray-600">
      <NavLink to="/match">
        <img
          src={retour}
          alt="Voir le profil"
          className="h-10  lg:h-[60%] lg:w-20 lg:mr-6  mb-2"
        />
      </NavLink>
      <img
        src={profil}
        alt="logo du site"
        className="h-[55%] mt-2 self-center "
      />
      <button
        type="button"
        onClick={() => {
          localStorage.clear();
          setUser("");
          navigate("/");
        }}
      >
        <img
          src={logout}
          alt="Voir les matchs"
          className="h-10  lg:h-[45%] mb-2 lg:ml-6 "
        />
      </button>
    </div>
  );
}
