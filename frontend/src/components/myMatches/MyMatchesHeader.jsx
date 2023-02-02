import React from "react";
import { NavLink } from "react-router-dom";
import flamme from "../../assets/LogoBleu.png";
import profil from "../../assets/profil.svg";
import retour from "../../assets/return.svg";

export default function MyMatchesHeader() {
  return (
    <div className="h-[14vh] px-2 lg:h-[18vh] flex justify-between bg-[#eeeeee]  items-end border-b-2 border-gray-600">
      <NavLink to="/match">
        <img
          src={retour}
          alt="Voir le profil"
          className="h-10  lg:h-[60%] lg:w-20 lg:mr-6  mb-2"
        />
      </NavLink>
      <img
        src={flamme}
        alt="logo du site"
        className="h-[55%] mt-2 self-center "
      />
      <NavLink to="/myprofile">
        <img
          src={profil}
          alt="Voir les matchs"
          className="h-10  lg:h-[45%] mb-2 lg:ml-6 "
        />
      </NavLink>
    </div>
  );
}
