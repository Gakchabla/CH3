import React from "react";

export default function MatchedProfiles({ profile }) {
  const getHowOld = (birthdate) => {
    const today = new Date() / 1000;
    const birth = new Date(birthdate) / 1000;
    const years = today - birth;
    return Math.floor(years / 365.25 / 24 / 3600);
  };

  return (
    <div className="h-32 font-gothamTitle border-b-2 border-slate-300 flex items-center bg-[#eeeeee]">
      <img
        src={profile.picture_url}
        alt={`${profile.firstname} avatar`}
        className="w-24 h-24 object-cover rounded-full ml-4"
      />
      <div className="flex flex-col ml-2">
        <h2 className="text-lg">
          {profile.firstname} {profile.lastname}, {getHowOld(profile.birthdate)}
        </h2>
        <h3 className="font-gotham truncate w-60">
          {profile.description ? profile.description : "Pas de description"}
        </h3>
      </div>
    </div>
  );
}
