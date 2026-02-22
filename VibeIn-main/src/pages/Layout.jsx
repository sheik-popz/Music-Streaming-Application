import React from 'react'
import Navbarcontainer from '../components/navigation bar/Navbarcontainer'
import { Outlet } from 'react-router-dom'
import Register from '../auth/Register'

const Layout = () => {
  return (
    <div>
        <Navbarcontainer/>
        <Outlet/>
    </div>
  )
}

export default Layout