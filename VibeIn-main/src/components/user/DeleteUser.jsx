import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUser } from "firebase/auth";

import { deleteDoc, doc } from "firebase/firestore";
import { __DB } from "../../backend/Firebaseconfig";
import Spinner from "../../helpers/Spinner";
import { AuthContextApi } from "../../context/AuthContext";

const DeleteAccount = () => {
  let [text,setText]=useState("")
  let { authUser } = useContext(AuthContextApi);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();


  const handleChange=(e)=>{
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {if(text.toLowerCase().trim() ==="delete account"){
      setIsLoading(true);
      let user_collection=doc(__DB,"user_profile",authUser?.uid)
      await deleteUser(authUser);
      await deleteDoc(user_collection)
      toast.success("Account Deleted Successfully");
      navigate("/auth/register");}
      else{
        toast.error("Invalid Input")
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

return (
  <section className="flex justify-center items-center h-[calc(100vh-70px)] w-[100%] bg-slate-900 ">
    <div className="w-[50%] h-auto bg-slate-700 p-4 rounded-lg">
      <header>
        <h1 className="text-center text-2xl text-white">Delete Account</h1>
      </header>
      <main className="p-2 mt-3">
        <form action="" className="flex flex-col text-white" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <h3>Are You Sure Want to Delete the Account?</h3>
            <h3>If yes , Enter Delete Account !</h3>
            <input type="text" placeholder="Delete Account"  className="outline-none bg-white py-2 px-4 rounded-lg text-black mt-2 w-[100%]" name="text" value={text} onChange={handleChange}/>
            <button className="py-2 bg-red-600 w-[100%] rounded-lg font-semibold mt-2 cursor-pointer hover:bg-red-800">
              Delete Account
            </button>
          </div>
          
        </form>
      </main>
    </div>
    {isLoading && <Spinner />}
  </section>
);
};
export default DeleteAccount;