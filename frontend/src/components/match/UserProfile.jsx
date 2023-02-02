import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import isConnected from "../../services/isConnected";

import infos from "../../assets/infos.svg";
import cross from "../../assets/cross.svg";
import heart from "../../assets/heart.svg";
import { useCurrentUserContext } from "../../contexts/userContext";

const backURL = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile({ profile, index }) {
  const { user, token, setUser } = useCurrentUserContext();
  const [userPicture, setUserPicutre] = useState({});
  const [photo, setPhoto] = useState([]);
  const [visible, setVisible] = useState(true);
  const [modal, setModal] = useState(false);
  const [viewInfos, setViewInfos] = useState(false);

  const navigate = useNavigate();

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    fetch(`${backURL}/api/pictures/users/${profile.id}`, { headers: myHeaders })
      .then((result) => {
        if (!isConnected(result)) {
          localStorage.clear();
          setUser("");
          navigate("/");
        }
        return result;
      })
      .then((result) => result.json())
      .then((result) => {
        setPhoto(result);
      });
  }, []);

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
      .then((result) => {
        setUserPicutre(result);
      });
  }, []);

  const handleHeart = async () => {
    const heartHeaders = new Headers();
    heartHeaders.append("Content-Type", "application/json");
    heartHeaders.append("authorization", `Bearer ${token}`);
    const body = JSON.stringify({ userId: user.id, likedId: profile.id });
    const requestOptions = {
      method: "POST",
      headers: heartHeaders,
      body,
    };

    const match = await fetch(`${backURL}/api/checkmatch`, requestOptions)
      .then((result) => {
        if (!isConnected(result)) {
          localStorage.clear();
          setUser("");
          navigate("/");
        }
        return result;
      })
      .then((result) => {
        return result.status;
      });
    if (match === 200) {
      setModal(true);
    } else setVisible(false);
  };
  const handleCross = () => {
    setVisible(false);
  };

  const getHowOld = (birthdate) => {
    const today = new Date() / 1000;
    const birth = new Date(birthdate) / 1000;
    const years = today - birth;
    return Math.floor(years / 365.25 / 24 / 3600);
  };

  return (
    <div>
      {modal && (
        <div className="w-screen h-screen bg-black/30 fixed z-30 top-0 flex flex-col justify-center items-center">
          {" "}
          <div className="w-80 h-80 flex bg-slate-300 rounded-full">
            <img
              src={photo[0] ? photo[0].picture_url : ""}
              alt="user"
              className="w-[50%] object-left object-cover rounded-l-full"
            />
            <img
              src={userPicture[0] ? userPicture[0].picture_url : ""}
              alt="user"
              className="w-[50%] object-cover object-right rounded-r-full"
            />
          </div>{" "}
          <h2 className="text-5xl font-gothamTitle text-white">
            It's a Match!
          </h2>
          <NavLink to="/mymatches">
            <button
              type="button"
              className="font-gotham text-lg text-slate-200 hover:text-slate-600"
            >
              Voir mes matchs!
            </button>
          </NavLink>
          <button
            type="button"
            onClick={() => {
              setModal(false);
              setVisible(false);
            }}
            className="font-gotham text-lg text-slate-200 hover:text-slate-600"
          >
            Continuer à matcher!
          </button>
        </div>
      )}
      {visible && (
        <div className={`absolute z-[${index}] bg-[#eeeeee]`}>
          <div className="flex justify-center font-gothamTitle w-screen text-white">
            <div
              className={`${
                viewInfos ? "w-full h-[60vh]" : "w-[95%] h-[65vh] rounded-3xl"
              }  bg-slate-300 lg:shadow-xl max-w-md lg:w-[50vw] lg:max-w-[50vw]`}
            >
              <img
                src={photo[0] ? photo[0].picture_url : ""}
                alt="user"
                className={`${
                  viewInfos ? "" : "rounded-3xl"
                } h-full object-cover lg:w-[50%] lg:rounded-r-none`}
              />
              <div className="relative lg:absolute bottom-12 lg:top-2 lg:ml-[26vw] ml-2 text-3xl flex flex-wrap text-[#eeee] lg:text-black justify-between">
                {profile.firstname} {viewInfos ? profile.lastname : ""},{" "}
                {getHowOld(profile.birthdate)}{" "}
                <button
                  type="button"
                  onClick={() => setViewInfos(!viewInfos)}
                  className="lg:invisible"
                >
                  <img src={infos} alt="infos" />
                </button>
                <p className="text-black hidden lg:block lg:absolute lg:top-12  font-gotham text-lg w-64 max-w-md mt-4">
                  {profile.description}
                </p>
              </div>
            </div>
          </div>
          {viewInfos && (
            <div className="flex w-screen justify-center">
              <p className="text-black font-gotham text-lg w-[90%] max-w-md mt-4">
                {profile.description}
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <div className="flex justify-around mt-10 w-[70%] max-w-md">
              <button
                type="button"
                onClick={handleCross}
                className="w-[5.5rem] h-[5.5rem] border-gray-400/40  border-2 rounded-full flex justify-center items-center"
              >
                <img src={cross} alt="cross" />
              </button>
              <button
                type="button"
                onClick={handleHeart}
                className="w-[5.5rem] h-[5.5rem] border-gray-400/40  border-2 rounded-full flex justify-center items-center pt-1"
              >
                <img src={heart} alt="heart" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
