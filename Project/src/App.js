import './App.css';
import React, { useEffect } from 'react';


// import PrivateRoute from './Componts/privateRouter/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setCredentials } from './Componets/Feature/Slice/Authslice';

// import Forgotpassword from './Componts/User/Forgotpassword/Forgotpassword';

import Adminroute from './Componets/Routes/Adminroutes/Adminroutes';
import Comman from './Componets/Routes/Comman/Comman';
import Employeer from './Componets/Routes/Employeer/Employeer';
import UserRoute from './Componets/Routes/UserRoutes.jsx/UserRoute';
// import Home from './Componts/Roles/User/Home/Home';

function App() {
  // const { userInfo, role } = useSelector((state) => state.auth); // Change to 'role'
  const { userInfo,role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Get userInfo and role from localStorage when app starts
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedUserRole = localStorage.getItem('userRole');
    console.log(storedUserRole)
    if (storedUserRole && !role) {
      dispatch(setCredentials({ role: storedUserRole }));
    }
  
    if (storedUserInfo && storedUserRole) {
      const { userInfo } = JSON.parse(storedUserInfo);
      dispatch(setCredentials({ userInfo, role: storedUserRole }));
    }
  }, [dispatch, role]);
  
  

  return (
    <div>
     
      <Routes>
      {!role && (
  <>
    <Route path='/*' element={<Comman />} />
   
  </>
)}

  {role && (
    <>
      <Route path='/*' element={<Adminroute />} />
      <Route path='/admin/*' element={<Adminroute />} />
      <Route path='/employeer/*' element={<Employeer />}/>
      <Route path='/user/*' element={<UserRoute />} /> 
       
    </>
  )}
</Routes>
    </div>
  );
}

export default App;