import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import isConnected from "../services/isConnected";
import UserProfile from "../components/match/UserProfile";
import MatchHeader from "../components/match/MatchHeader";
import { useCurrentUserContext } from "../contexts/userContext";

const backURL = import.meta.env.VITE_BACKEND_URL;

export default function Match() {
  const [users, setUsers] = useState([]);
  const { user, token, setUser } = useCurrentUserContext();

  const navigate = useNavigate();

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await fetch(`${backURL}/api/users`, {
        headers: myHeaders,
      })
        .then((result) => {
          if (!isConnected(result)) {
            localStorage.clear();
            setUser("");
            navigate("/");
          }
          return result;
        })
        .then((result) => result.json());
      const likedUsers = await fetch(`${backURL}/api/liked/users/${user.id}`, {
        headers: myHeaders,
      }).then((result) => result.json());

      const userLeft = allUsers.filter(
        (allUser) =>
          !likedUsers.some(
            (likedUser) => likedUser.user_liked_id === allUser.id
          ) && allUser.id !== user.id
      );
      setUsers(userLeft);
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <div className="h-auto min-h-screen w-screen bg-[#eeeeee]">
        <MatchHeader />

        {users.length > 0 && (
          <div className="">
            {users.map((userd, index) => (
              <div>
                <UserProfile key={userd.id} profile={userd} index={index} />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center font-gothamTitle w-screen text-white">
          <div className="w-[95%] max-w-md h-[65vh] bg-slate-300 rounded-3xl text-4xl text-center text-slate-500 flex justify-center items-center">
            Il n'y a plus personne à liker... <br /> Reviens plus tard!
          </div>
        </div>
      </div>
    </div>
  );
}
