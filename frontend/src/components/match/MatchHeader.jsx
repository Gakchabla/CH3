import React from "react";
import { NavLink } from "react-router-dom";

import flamme from "../../assets/LogoBleu.png";
import profil from "../../assets/profil.svg";
import message from "../../assets/message.svg";

export default function MatchHeader() {
  return (
    <div className="h-[14vh] lg:h-[18vh] px-2 flex justify-between lg:justify-center items-end">
      <NavLink to="/myprofile">
        <img
          src={profil}
          alt="Voir le profil"
          className="h-10 w-12 lg:h-14 lg:mr-6  mb-2"
        />
      </NavLink>
      <img
        src={flamme}
        alt="logo du site"
        className="h-[55%] mt-2 self-center"
      />
      <NavLink to="/mymatches">
        {" "}
        <img
          src={message}
          alt="Voir les matchs"
          className="h-10 lg:h-14 mb-2 lg:ml-6"
        />
      </NavLink>
    </div>
  );
}
