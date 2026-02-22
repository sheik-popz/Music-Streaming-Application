import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete, MdManageAccounts } from "react-icons/md";
import { TbPasswordUser, TbPhotoEdit } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="h-[100%] w-[20%] bg-slate-600 px-7 text-[18px] py-12 text-white shrink-0">
      <ul className="flex flex-col gap-[20px] text-white">
        <li>
          <NavLink
            to="/UserProfile"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-900 ${
                isActive && "bg-slate-800"
              }`;
            }}
          >
            <span>
              <MdManageAccounts />
            </span>
            <span>My Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/UserProfile/UpdatePicture"
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-900 ${
                isActive && "bg-slate-800"
              }`;
            }}
          >
            <span><TbPhotoEdit /></span>
            <span>Update Picture</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/UserProfile/UpdateProfile"
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-900 ${
                isActive && "bg-slate-800"
              }`;
            }}
          >
             <span><FaUserEdit />
             </span>
             <span>Update Profile</span>
            
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/UserProfile/UpdatePassword"
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-900 ${
                isActive && "bg-slate-800"
              }`;
            }}
          >
            <span><TbPasswordUser  /></span>
            <span> Update Password</span>
           
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/UserProfile/DeleteUser"
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-red-700 ${
                isActive && "bg-red-800"
              }`;
            }}
          >
            <span><MdDelete />
            </span>
            <span>Delete User</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
