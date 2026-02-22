import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContextApi } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";
const UpdatePicture = () => {
  let [picture, setPicture] = useState(null);
  let [preview, setpreview] = useState(null);
   let [isLoading,setLoading]=useState(false)
  let {authUser}=useContext(AuthContextApi)
  let navigate=useNavigate()
  const handle = (e) => {
    let file = e.target.files[0];
    setPicture(file);

    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setpreview(url);
    }
  };
  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (!picture) {
        toast.error("Select a photo");
        return;
      } else {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "innovators-hub-music");
        let response=await fetch("https://api.cloudinary.com/v1_1/dfrb87cai/image/upload",{
          method:"POST",
          body:data
        });
       let result=await response.json()
       console.log(result);

       await updateProfile(authUser,{photoURL:result.url})
       toast.success("photo uploaded")
       navigate("/UserProfile/UserAccount")
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-slate-800 flex justify-center items-center text-white">
      <article className="min-h-[300px] w-[40%] bg-slate-700 rounded-xl p-4">
        <h2 className="text-center text-2xl">Upload Profile Picture</h2>
        <form
          action=""
          className="flex gap-3 mt-4 flex-col"
          onSubmit={handlesubmit}
        >
          <div className="h-30 w-30 m-auto  bg-slate-500 rounded-full">
            {preview ? (
              <img
                src={preview}
                className="h-[100%] w-[100%] rounded-full"
                alt=""
              />
            ) : (
              <div className="h-[100%] w-[100%] rounded-full  flex items-center justify-center ">
                {" "}
                No file selected
              </div>
            )}
          </div>
          <label
            htmlFor="photo"
            className="w-[100%] text-center py-2 block  border-2 border-white rounded-lg"
          >
            Select a Photo
          </label>
          <input
            type="file"
            name="picture"
            id="photo"
            accept="image/*"
            onChange={handle}
            className="hidden "
          />

          <button
            className={
              "bg-blue-700 p-2 rounded-lg hover:bg-blue-800 w-[100%] block "
            }
          >
            Upload Photo
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePicture;
