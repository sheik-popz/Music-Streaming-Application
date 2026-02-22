import React, { useContext } from 'react'
import { AuthContextApi } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Publicroutes = (props) => {
 let {authUser}=useContext(AuthContextApi)

 if(authUser){
return <Navigate to={"/"}/>
 }else{
    return props.children
 }
}

export default Publicroutes