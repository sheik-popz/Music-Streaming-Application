import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";
import toast from "react-hot-toast";
import {  sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig";
import { AuthContextApi } from "../context/AuthContext";

const Login = () => {
  let [togglePass, settogglePass] = useState(false);
  let [isLoading,setLoading]=useState(false)
  let navigate=useNavigate()
  let  {SetauthUser}=useContext(AuthContextApi)

  let [data, setdata] = useState({
      email: "",
      password: ""
    });
    let { email, password} = data;
    let handle = (e) => {
      let value = e.target.value;
      let key = e.target.name;
      setdata({ ...data, [key]: value });
    };

    let handlesubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        let obj=await signInWithEmailAndPassword(__AUTH,email,password)
        let {user}=obj
        console.log(user);
        if(user.emailVerified===true){
          toast.success("login success")
          SetauthUser(user)
          navigate("/")
        }
        else{
          toast.error("Verify your mail")
          sendEmailVerification(user)
        }
      } catch (error) {
        toast.error(error.message);
      }
      finally{
        setLoading(false)
      }
    };

  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center text-[white]">
      <div className="bg-slate-700 w-[30%] rounded-[5px] p-4">
        <header>
          <h1 className="text-center text-3xl">Login</h1>
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
            <div className="relative">
              <label htmlFor="pass" className="block text-lg">
                Password
              </label>
              <input
                onChange={handle}
                value={password}
                name="password"
                type={togglePass ? "text" : "password"}
                id="pass"
                placeholder="Enter Password"
                className="outline-none border-1 rounded-[3px] w-[100%] my-1 py-1 pl-2"
              />
              {togglePass ? (
                <FaEye
                  className="absolute top-10 right-4  cursor-pointer"
                  onClick={() => {
                    settogglePass(!togglePass);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-10 right-4  cursor-pointer"
                  onClick={() => {
                    settogglePass(!togglePass);
                  }}
                />
              )}
            </div>
            <div className="flex justify-center">
              <button className=" rounded-[5px] w-[100%] p-1 bg-[blue]  hover:cursor-pointer hover:bg-blue-700">
                Login
              </button>
            </div>
            <div className="ml-2 flex justify-center gap-3">
              <p>Don't have an account ?</p>
              <NavLink to="/auth/register" className="text-[red] hover:underline">
                Register
              </NavLink>
            </div>
            <div className="ml-1 flex justify-center gap-3">
              <NavLink to="/auth/forget-password" className="text-[#92afee] hover:underline">
                Forget Password ?
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Login;
