import React from 'react'
import "./layout.scss"
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar' 
import Footer from '../../Components/Footer/Footer'
import { useSelector, useDispatch } from 'react-redux'

export const Layout = () => {
  
  return (
    <div className='layout'>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>

  )
}

export const AuthLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  if(!currentUser) return <Navigate to={'/signin'} />

    return (
      <div className='layout'>
        <Navbar />
        <Outlet />
        <Footer/>
      </div>
  
    )
}
