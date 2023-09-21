import { useLocation,Navigate,Outlet } from "react-router-dom";
import React from 'react'

function Requireemployeer({ children }) {
  const roles = localStorage.getItem('userRole');
  const location = useLocation();
  
  return (
    <>
     {roles ? <Outlet/>: <Navigate to={'/login'} state={{ from: location }} replace />}
    
  </>
  )
}

export default Requireemployeer
