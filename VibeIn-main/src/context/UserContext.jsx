import { createContext, useContext, useEffect, useState } from "react"
import { __DB } from "../backend/Firebaseconfig"
import { AuthContextApi } from "./AuthContext"
import { doc, onSnapshot } from "firebase/firestore"

export let useContextapi=createContext()
let UserProvider=(props)=>{
let{authUser}=useContext(AuthContextApi)
let [isLoading,setLoading]=useState(true)
let[userProfile,setuserProfile]=useState(null)

useEffect(()=>{
let fetchProfile=()=>{
   let user_collection= doc(__DB,"user_profile",authUser?.uid)
    onSnapshot(user_collection,(data)=>{
// console.log(data);
setuserProfile(data.data())
    })
}
if(authUser){
    fetchProfile()
}
setLoading(false)
},[authUser])
    return(
        <useContextapi.Provider value={{userProfile,isLoading}}>
            {props.children}
        </useContextapi.Provider>

    )
}
export default UserProvider