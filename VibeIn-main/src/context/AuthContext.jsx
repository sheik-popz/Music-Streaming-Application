import { createContext, useEffect, useState } from "react";
import { __AUTH } from "../backend/Firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContextApi = createContext();

const AuthProvider = (props) => {
  let [authUser, SetauthUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(__AUTH,(userInfo)=>{
      if(userInfo ?.emailVerified === true){
        SetauthUser(userInfo)
        window.localStorage.setItem("TOKEN",userInfo.accessToken)
      }
      else{
        SetauthUser(null)
        window.localStorage.removeItem("TOKEN")
      }
    })
    
  },[__AUTH])
  return (
    <AuthContextApi.Provider
      value={{ authUser, SetauthUser }}
    >
        {props.children}
    </AuthContextApi.Provider>
  );
};
export default AuthProvider;
