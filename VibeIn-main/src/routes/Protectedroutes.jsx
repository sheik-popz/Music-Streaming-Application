import React, { useContext } from 'react'
import { AuthContextApi } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Protectedroutes = (props) => {
    let {authUser}=useContext(AuthContextApi)

    if(authUser){
        return props.children
    }else{
      
       return <Navigate to={"/auth/login"}/>
    }
}

export default Protectedroutes