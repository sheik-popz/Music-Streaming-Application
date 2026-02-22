import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useContextapi } from '../context/UserContext'

const Adminroutes = (props) => {
    let {userProfile}=useContext(useContextapi)

    if(userProfile?.role==="admin"){
        return props.children
    }else{
      
       return <Navigate to={"/"}/>
    }
}

export default Adminroutes