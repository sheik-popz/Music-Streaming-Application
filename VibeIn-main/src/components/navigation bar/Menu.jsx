import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContextApi } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { __AUTH } from "../../backend/Firebaseconfig";
import { FaHome } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";
import { useContextapi } from "../../context/UserContext";
import { MdAdminPanelSettings } from "react-icons/md";
import Spinner from "../../helpers/Spinner";

const Menu = () => {
  let navigate = useNavigate();
  let { userProfile,isLoading } = useContext(useContextapi);
  let { authUser } = useContext(AuthContextApi);
  const logout = async () => {
    try {
      await signOut(__AUTH);
      toast.success("Logged out");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <ul className="flex gap-3 font-semibold">
        {userProfile?.role ==="admin"
        && authUser&&(
          <li>
            <NavLink
              to="/admin"
              className={(obj) => {
                let { isActive } = obj;
                return `flex items-center gap-3 py-2 px-4 rounded-[5px] cursor-pointer hover:bg-blue-600 text-[white] hover:underline hover:scale-105 duration-75 ${
                  isActive && "bg-blue-600"
                }`;
              }}
            >
              <span>
              <MdAdminPanelSettings />
              </span>
              <span> Admin</span>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/"
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-[5px] cursor-pointer hover:bg-blue-600 text-[white] hover:underline hover:scale-105 duration-75 ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            <span>
              <FaHome />
            </span>
            <span> Home</span>
          </NavLink>
        </li>
        {authUser ? (
          <>
            <li>
              <NavLink
                onClick={logout}
                className={
                  "flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 hover:underline hover:scale-105 duration-75  text-[white]"
                }
              >
                <span>
                  <CiLogout />
                </span>
                <span> Logout</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/UserProfile"}>
                <img
                  src={authUser.photoURL}
                  alt=""
                  className="rounded-full h-[35px] w-[35px] hover:underline hover:scale-105 duration-75"
                />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/auth/login"
                className={(obj) => {
                  let { isActive } = obj;
                  return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 text-[white] hover:underline hover:scale-105 duration-75 ${
                    isActive && "bg-blue-600"
                  }`;
                }}
              >
                <span>
                  <CiLogin />
                </span>
                <span> Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/register"
                className={(obj) => {
                  let { isActive } = obj;
                  return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 text-[white] hover:underline hover:scale-105 duration-75 ${
                    isActive && "bg-blue-600"
                  }`;
                }}
              >
                <span>
                  <GiArchiveRegister />
                </span>
                <span> Register</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isLoading && <Spinner />}
    </div>
  );
};

export default Menu;
