import React, { useContext, useState } from "react";
import { AuthContextApi } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { __DB } from "../../backend/Firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import Spinner from "../../helpers/Spinner";
import { useNavigate } from "react-router-dom";
import { useContextapi } from "../../context/UserContext";

const UpdateProfile = () => {
  let { authUser } = useContext(AuthContextApi);
  let {userProfile}=useContext(useContextapi)
  let [isLoading, setLoading] = useState(false);
  let navigate=useNavigate()
  let [data, setData] = useState({
    phoneno: userProfile ?.phoneNumber,
    dob: userProfile ?.dateOfBirth,
    languages: userProfile ?.languages,
    gender: userProfile ?.gender,
    address: userProfile ?.address,
  });
  let { phoneno, dob, languages, gender, address } = data;

  let handlechange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setData({ ...data, [key]: value });
  };
  let handlesubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    let { displayName, email, photoURL, uid } = authUser;
    let payload = {
      name: displayName,
      email: email,
      photo: photoURL,
      id: uid,
      phoneNumber: phoneno,
      dateOfBirth: dob,
      gender: gender,
      languages: languages,
      address: address,
      role: "user",
    };
    console.log(payload);

    try {
      setLoading(true)
      let usercollection = doc(__DB, "user_profile", uid);
      await setDoc(usercollection, payload);
      toast.success("Details added");
      navigate("/UserProfile")
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-slate-800 flex justify-center items-center text-white">
      <article className="min-h-[450px] w-[60%] bg-slate-600 rounded-xl p-4">
        <h2 className="text-2xl text-center">Upload profile data</h2>
        <form
          action=""
          onSubmit={handlesubmit}
          className="flex  mt-3 flex-col gap-4"
        >
          <article className="flex gap-4 ">
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="ph" className="block text-[19px]">
                Phone number
              </label>
              <input
                onChange={handlechange}
                type="tel"
                id="ph"
                name="phoneno"
                value={phoneno}
                placeholder="Enter phone number"
                className="outline-none text-black bg-white px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="dob" className="block text-[19px]">
                Date of Birth
              </label>
              <input
                onChange={handlechange}
                type="date"
                id="dob"
                name="dob"
                value={dob}
                placeholder="Enter DOB"
                className="outline-none text-black bg-white  px-4 py-2 rounded-lg"
              />
            </div>
          </article>
          <article className="flex gap-4 ">
            <div className="flex flex-col gap-2 mt-3  w-[48%]">
              <label htmlFor="lan" className="block text-[19px]">
                Languages
              </label>
              <input
                onChange={handlechange}
                type="text"
                id="lan"
                value={languages}
                name="languages"
                placeholder="Enter language"
                className="outline-none text-black bg-white px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col flex-wrap gap-4 mt-3  w-[48%]">
              <label className="block text-[19px]">Gender</label>
              <div className="flex gap-5 items-center">
                <span className="flex gap-2">
                  {" "}
                  <input
                    onChange={handlechange}
                    name="gender"
                    value="Male"
                    type="radio"
                    checked={gender==="Male"}
                  />{" "}
                  Male
                </span>

                <span className="flex gap-2">
                  {" "}
                  <input
                    onChange={handlechange}
                    name="gender"
                    value="Female"
                    type="radio"
                    checked={gender==="Female"}
                  />{" "}
                  Female
                </span>
                <span className="flex gap-2">
                  <input
                    onChange={handlechange}
                    name="gender"
                    value="Others"
                    type="radio"
                    checked={gender==="Others"}
                  />{" "}
                  Others
                </span>
              </div>
            </div>
          </article>
          <article>
            <div className="flex flex-col gap-2 mt-3  w-[100%]">
              <label htmlFor="address" className="block text-[19px]">
                Address
              </label>
              <textarea
                onChange={handlechange}
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder="Enter address"
                className="outline-none text-black bg-white px-4 py-2 rounded-lg"
              />
            </div>
          </article>
          <article className="text-center bg-blue-700 p-2 rounded-lg hover:bg-blue-800  w-[100%] block ">
            <button className="w-full  hover:cursor-pointer">Submit</button>
          </article>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdateProfile;
