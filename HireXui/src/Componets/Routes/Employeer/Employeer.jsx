import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../Navbar/Commannav/Navbar';
// import Checkemployeer from '../privateRouter/Checkemployeer';
import Login from '../../Comman/Login';
import Requireemployeer from '../../Feature/Require/Requireemployeer';
import PrivateRoute from '../PrivateRoute';
// here
// new pages
import EmployeerHome from '../../Roles/Employeer/Companyhome/EmployeerHome';
import Profile from '../../Roles/Employeer/Profile/Profile';
import Editprofile from '../../Roles/Employeer/Profile/Editprofile';
import PostPlan from '../../Roles/Employeer/Postplan/Postplan';
import Wallet from '../../Roles/Employeer/Wallet/Wallet';
import Postcreation from '../../Roles/Employeer/Postcreation/Postcreation';
import Createpost from '../../Roles/Employeer/Postcreation/Createpost';
import Viewmore from '../../Roles/Employeer/Postcreation/Viewmore';
import ApplicantList from '../../Roles/Employeer/ApplicantList/ApplicantList';
import ApplicandProfile from '../../Roles/Employeer/ApplicantList/Applicandprofile';
import Chatlist from '../../chat/Chatlist';
import Listapplicants from '../../Roles/Employeer/ApplicantList/Listapplicants';


function Employeer() {
  const role = localStorage.getItem('userRole');

  return (
    <div>
      <Navbar /> {/* Navbar outside of the Routes */}
      <Routes>
        {!role ? (
          <>
            <Route path="login" element={<Login />} />
            <Route
              path="/employeer/*"
              element={role ? <PrivateRoute /> : <Navigate to="/login" />}
            />
          </>
        ) : (
          <Route path="/employeer/*" element={<PrivateRoute />} />
        )}

        {role === 'recruiter' && (
          <Route element={<Requireemployeer />}>
            <Route path="/*" element={<Navigate to="/employeer/home" replace />} />
            <Route path="/" element={<Navigate to="/employeer/home" replace />} />
            <Route path="applicants-list" element={<Listapplicants />} />
            <Route path="postview" element={<Postcreation />} />
            <Route path="edit-profile" element={<Editprofile />} />
            <Route path="Postdetails" element={<Viewmore />} />
            <Route path="applicants" element={<ApplicantList/>} />
            <Route path="applicantsprofile" element={<ApplicandProfile/>} />
            <Route path="home" element={<EmployeerHome />} /> 
            <Route path="profile" element={<Profile />} />
            <Route path="postplan" element={<PostPlan />} />
            <Route path="Wallet" element={<Wallet />} />
            <Route path="Createpost" element={<Createpost />} />
            <Route path="chat-list" element={<Chatlist />} />
          
          
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default Employeer;
