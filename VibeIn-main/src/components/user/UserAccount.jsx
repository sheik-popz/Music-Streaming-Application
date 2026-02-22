import React, { useContext, useState } from "react";
import { AuthContextApi } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useContextapi } from "../../context/UserContext";
import Spinner from "../../helpers/Spinner";
const UserAccount = () => {
  let { authUser } = useContext(AuthContextApi);
  let { userProfile,isLoading } = useContext(useContextapi);
  return (
    <section className="h-[100%] w-[100%] bg-slate-800 flex justify-center items-center text-white">
      <article className="min-h-[300px] w-[40%] bg-slate-600 rounded-xl p-4">
        <header className="h-auto w-[100%] bg-slate-800 rounded-t-xl flex flex-col items-center justify-center gap-2">
          <img
            src={authUser?.photoURL}
            alt=""
            className="h-[100px] w-[100px] rounded-full -mt-18"
          />
          <h2 className="capitalize text-3xl">{authUser?.displayName} </h2>
          <h2>{authUser?.email}</h2>
        </header>
        {userProfile ? (
          <div className="mt-2">
            <h2 className=" text-2xl text-indigo-100 p-3">Personal Details</h2>
            <article className="flex flex-wrap gap-3">
              <div className="w-[48%] bg-slate-700 px-4 py-2 rounded-lg">
                <h3 className="">phone number</h3>
                <p>{userProfile?.phoneNumber}</p>
              </div>
              <div  className="w-[48%] bg-slate-700 px-4 py-2 rounded-lg">
                <h3>Date of Birth</h3>
                <p>{userProfile?.dateOfBirth}</p>
              </div>
              <div  className="w-[48%] bg-slate-700 px-4 py-2 rounded-lg">
                <h3>Languages</h3>
                <p>{userProfile?.languages}</p>
              </div>
              <div className="w-[48%] bg-slate-700 px-4 py-2 rounded-lg">
                <h3>Gender</h3>
                <p>{userProfile?.gender}</p>
              </div>
              <div className="w-[100%] bg-slate-700 px-4 py-2 rounded-lg">
                <h3>Address</h3>
                <p>{userProfile?.address}</p>
              </div>
            </article>
          </div>
        ) : (
          <>
            <div className="h-[150px] w-[100%] bg-slate-700 rounded-b-xl flex flex-col justify-center items-center gap-3">
              <h2 className="text-2xl">User data not Present</h2>
              <NavLink
                to={"/UserProfile/UpdateProfile"}
                className={"bg-blue-700 p-2 rounded-lg hover:bg-blue-800"}
              >
                Add user data
              </NavLink>
            </div>
          </>
        )}
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UserAccount;
