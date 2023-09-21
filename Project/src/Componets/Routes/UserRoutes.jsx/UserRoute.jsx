import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserNavbar from '../../Navbar/Usernavbar/UserNavbar';
import './Userroute.css'
import Userprofile from '../../Roles/User/Profile/Userprofile';
import Usereditprofile from '../../Roles/User/Profile/Usereditprofile';
import Joblist from '../../Roles/User/Job/Joblist';
import Jobstatus from '../../Roles/User/Job/Jobstatus';
import Seachjoblist from '../../Roles/User/Job/Seachjoblist';
import About from '../../Roles/User/About/About';
import AboutCompany from '../../Roles/User/About/AboutCompany';
import PrivateRoute from '../PrivateRoute';
// import Chat from '../Roles/User/Chat/Chat';
import Jobviewall from '../../Roles/User/Job/Jobviewall';
import Chatlist from '../../chat/Chatlist';
// here

import Home from '../../Roles/User/Home/Home';
import Chat from '../../Roles/User/Chat';
function UserRoute() {
  const role = localStorage.getItem('userRole');

  return (
    <>
    
      {role === 'user' && (
        <div className="content-container">
        <UserNavbar />
        <div className="content">
          <Routes>
          <Route element={<PrivateRoute />}>
           <Route path="home" element={<Home />} />
            <Route path="profile" element={<Userprofile />} />
            <Route path="editprofile" element={<Usereditprofile />} />
            <Route path="joblist" element={<Joblist />} />
            <Route path="jobviewmore" element={<Jobviewall />} />
            <Route path="jobstatusview" element={<Jobstatus />} />
            <Route path="job-listing" element={<Seachjoblist />} />
            <Route path="About-Hirex" element={<About />} />
            <Route path="About-Company" element={<AboutCompany />} />
            <Route path="Chat-view" element={<Chatlist />} />
            <Route path="chat-page" element={<Chat />} />
            {/* <Route path="chat-view" element={<Cha />} /> */}
            
            {/* Add more routes as needed */}
            </Route>
          </Routes>
        </div>
      </div>
      )}
    </>
  );
}

export default UserRoute;
