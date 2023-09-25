import React from 'react';
import Login from '../../Roles/Comman/Login';
import Rsignup from '../../Roles/Comman/Employeesignup/Rsignup';
import Navbar from '../../Navbar/Commannav/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Otp from '../../Roles/Comman/Otp/otp';
import Signup from '../../Roles/Comman/Usersignup/Signup';
import ForgotPassword from '../../Roles/Comman/ForgotPassword';
function Comman() {

    const role = localStorage.getItem('userRole');
  return (
    <div>
    <Navbar/>
      {!role && (
    <>

       <Routes>
       <Route path='/*' element={<Login />} />
       <Route path='/' element={<Login />} />
      <Route path='/admin/*' element={<Login />} />
      <Route path='/companysignup/*' element={<Rsignup />} />
      <Route path='/otp/*' element={<Otp />} />
      <Route path='/signup/*' element={<Signup />} />
      <Route path='/forgotpassword/*' element={<ForgotPassword />} />
     
       </Routes>
     
    </>
  )}
   
    </div>
  )
}

export default Comman




