import React, { useState } from "react";
import Spinner from "../helpers/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig";
import toast from "react-hot-toast";

const ForgetPass = () => {
  let [email, setEmail] = useState("");
  let [isLoading, setLoading] = useState(false);
  let navigate=useNavigate()
  const handle = (e) => {
    setEmail(e.target.value);
  };
  const handlesubmit = async(e) => {
    e.preventDefault();
    try{
        setLoading(true)
await sendPasswordResetEmail(__AUTH,email)
toast.success("reset link send to mail")
navigate("/auth/login")
    }
    catch(error){
toast.error(error.message.slice(22,error.message.length-2))
    }
    finally{
        setLoading(false)
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center text-[white]">
      <div className="bg-slate-700 w-[30%] rounded-[5px] p-4">
        <header>
          <h1 className="text-center text-3xl">Reset Password</h1>
        </header>
        <main className="p-2">
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handlesubmit}
          >
            <div>
              <label htmlFor="mail" className="block text-lg">
                Email
              </label>
              <input
                onChange={handle}
                value={email}
                name="email"
                type="email"
                id="mail"
                placeholder="Enter Email"
                className="outline-none border-1 rounded-[3px] w-[100%] my-1 py-1 pl-2"
              />
            </div>

            <div className="flex justify-center">
              <button className=" rounded-[5px] w-[100%] p-1 bg-[blue]  hover:cursor-pointer hover:bg-blue-700">
                Reset Password
              </button>
            </div>
            <div className=" text-center ">
              <NavLink
                to="/auth/login"
                className="text-[white] w-[100%] block bg-[red] p-1 rounded-md"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};



export default ForgetPass;
