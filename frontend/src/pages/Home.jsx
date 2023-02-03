import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import flamme from "../assets/Background.svg";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

export default function Home() {
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();

  const { user } = useCurrentUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) navigate("/match");
  }, []);

  return (
    <div>
      {isMobile && (
        <div className="bg-gradient-to-bl from-[#8e7cff] to-[#3d2f97] h-screen w-screen">
          <div className="h-3/6 flex items-end">
            <div className="font-gothamTitle text-white text-5xl w-full flex flex-col h-[20vh] justify-between items-center">
              <h1>Hackatinder</h1>
              <img src={flamme} alt="Hackatinder logo" />
            </div>
          </div>
          <div className="h-3/6  flex items-center justify-end flex-col">
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/login"
            >
              <button
                type="button"
                className="w-4/5 max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Se connecter
              </button>
            </NavLink>
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/register"
            >
              <button
                type="button"
                className="w-4/5 max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Créer un compte
              </button>
            </NavLink>
          </div>
        </div>
      )}
      {isLittleMobile && (
        <div className="bg-gradient-to-bl from-[#8e7cff] to-[#3d2f97] bg-cover h-screen w-screen">
          <div className="h-3/6 flex items-end">
            <div className="font-gothamTitle text-white text-5xl w-full flex flex-col h-[20vh] justify-between items-center">
              <h1>Hackatinder</h1>
              <img src={flamme} alt="Hackatinder logo" />
            </div>
          </div>
          <div className="h-3/6 flex items-center justify-end flex-col">
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/login"
            >
              <button
                type="button"
                className="w-4/5 min-w-fit max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Se connecter
              </button>
            </NavLink>
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/register"
            >
              <button
                type="button"
                className="w-4/5 min-w-fit max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Créer un compte
              </button>
            </NavLink>
          </div>
        </div>
      )}
      {isTablet && (
        <div className="bg-gradient-to-bl from-[#8e7cff] to-[#3d2f97] bg-cover h-screen w-screen">
          <div className="h-3/6 flex items-end">
            <div className="font-gothamTitle text-white text-5xl w-full flex flex-col h-[20vh] justify-between items-center">
              <h1>Hackatinder</h1>
              <img src={flamme} alt="Hackatinder logo" />
            </div>
          </div>
          <div className="h-3/6 flex items-center justify-end flex-col">
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/login"
            >
              <button
                type="button"
                className="w-3/5
                .3+ max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Se connecter
              </button>
            </NavLink>
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/register"
            >
              <button
                type="button"
                className="w-3/5 max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Créer un compte
              </button>
            </NavLink>
          </div>
        </div>
      )}
      {isDesktop && (
        <div className="bg-gradient-to-bl from-[#8e7cff] to-[#3d2f97] bg-cover h-screen w-screen">
          <div className=" flex items-end">
            <div className="font-gothamTitle text-white text-5xl w-full flex justify-start items-end mt-2">
              <img src={flamme} className="h-16 mx-2" alt="Hackatinder logo" />
              <h1>Hackatinder</h1>
            </div>
          </div>
          <div className="h-4/6 flex items-center justify-end flex-col">
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/login"
            >
              <button
                type="button"
                className="w-1/5 max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Se connecter
              </button>
            </NavLink>
            <NavLink
              className="w-full flex items-center justify-end flex-col"
              to="/register"
            >
              <button
                type="button"
                className="w-1/5 max-w-[16rem] h-12 bg-white my-2 rounded-3xl font-gotham text-2xl"
              >
                Créer un compte
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
