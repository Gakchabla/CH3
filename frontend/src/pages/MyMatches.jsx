import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import isConnected from "../services/isConnected";

import MatchedProfiles from "../components/myMatches/MatchedProfiles";
import MyMatchesHeader from "../components/myMatches/MyMatchesHeader";
import { useCurrentUserContext } from "../contexts/userContext";

const backURL = import.meta.env.VITE_BACKEND_URL;

export default function MyMatches() {
  const { user, token, setUser } = useCurrentUserContext();
  const [userMatches, setUserMatches] = useState([]);
  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backURL}/api/getusermatches/${user.id}`, { headers: myHeaders })
      .then((result) => {
        if (!isConnected(result)) {
          localStorage.clear();
          setUser("");
          navigate("/");
        }
        return result;
      })
      .then((result) => result.json())
      .then((result) => setUserMatches(result));
  }, []);

  return (
    <div className="w-screen h-screen bg-[#eeeeee]">
      <MyMatchesHeader />
      {userMatches.map((userMatch) => (
        <div>
          <MatchedProfiles profile={userMatch} />
        </div>
      ))}
    </div>
  );
}
