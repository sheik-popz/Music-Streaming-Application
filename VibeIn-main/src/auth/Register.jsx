import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";

const Register = () => {
  let [togglePass, settogglePass] = useState(false);
  let [togglePass2, settogglePass2] = useState(false);
  let [isLoading,setLoading]=useState(false)
  let navigate=useNavigate()
  let [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let { username, email, password, confirmPassword } = data;
  let handle = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setdata({ ...data, [key]: value });
  };

  let handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (password !== confirmPassword) {
        toast.error("confirm password does not match");
        setdata({ ...data, confirmPassword: "" });
      } else {
        let obj = await createUserWithEmailAndPassword(__AUTH, email, password);
        let { user } = obj;
        await updateProfile(user, {
          displayName: username,
          photoURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBya7zkEMoRqCBMruJjdK5It_PkyNZW42pZw&s",
        });
        sendEmailVerification(user)
        toast("verification sent")
        toast.success("user registered")
        navigate("/auth/login")
        console.log(obj);
      }
    } catch (error) {
      toast.error(error.message.slice(22,error.message.length-2));
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center text-[white]">
      <div className="bg-slate-700 w-[30%] rounded-[5px] p-4">
        <header>
          <h1 className="text-center text-3xl">Register</h1>
        </header>
        <main className="p-2">
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handlesubmit}
          >
            <div>
              <label htmlFor="username" className="block text-lg">
                Username
              </label>
              <input
                name="username"
                value={username}
                onChange={handle}
                type="text"
                id="usernme"
                placeholder="Enter Username"
                className="outline-none border-1 rounded-[3px] w-[100%] my-1 py-1 pl-2"
              />
            </div>
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
                type={togglePass ?   "text":"password"}
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
            <div className="relative">
              <label htmlFor="password" className="block text-lg">
                Confirm Password
              </label>
              <input
                onChange={handle}
                value={confirmPassword}
                name="confirmPassword"
                type={togglePass2 ?  "text":"password"}
                id="password"
                placeholder="Re-enter Password"
                className="outline-none border-1 rounded-[3px] w-[100%] my-1 py-1 pl-2"
              />
              {togglePass2 ? (
                <FaEye
                  className="absolute top-10 right-4  cursor-pointer"
                  onClick={() => {
                    settogglePass2(!togglePass2);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-10 right-4  cursor-pointer"
                  onClick={() => {
                    settogglePass2(!togglePass2);
                  }}
                />
              )}
            </div>
            <div className="flex justify-center">
              <button className=" rounded-[5px] w-[100%] p-1 bg-[blue]  hover:cursor-pointer hover:bg-blue-700 ">
                Register
              </button>
            </div>
            <div className="ml-2 flex justify-center gap-3">
              <p>Already have an account ?</p>
              <NavLink to="/auth/login" className="text-[red] hover:underline"> Login</NavLink>
            </div>
          </form>
        </main>
      </div>
     {isLoading&& <Spinner/>}
    </section>
  );
};

export default Register;
