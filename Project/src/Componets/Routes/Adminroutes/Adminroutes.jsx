import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Userlist from '../../Roles/Admin/Userlist/Userlist';
import RequireAdmin from '../../Feature/Require/RequireAdmin';
import './Adminroute.css';
import Adminnav from '../../Navbar/Navbaradminside/Adminnav';
import Dashboard from '../../Roles/Admin/Dashboard/Dashboard';
import Comanyslist from '../../Roles/Admin/Companylist/Comanyslist';
import Post from '../../Roles/Admin/Post/Post';
import Createpost from '../../Roles/Admin/Createpost/Createpost';
import Paymenthistory from '../../Roles/Admin/Pay/Paymenthistory';
function Adminroute() {
  const role = localStorage.getItem('userRole');

  return (
    <>
      {role === 'admin' && (
        <div className="admin-container">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <Adminnav />
          </div>
          
          {/* Page Content */}
          <div className="admin-content">
            <Routes>
              <Route element={<RequireAdmin />}>
                <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path="Companylist" element={<Comanyslist />} />
                <Route path="userlist" element={<Userlist />} />
                <Route path="postcreation" element={<Post />} />
                <Route path="createpost" element={<Createpost />} />
                {/* <Route path="paymenthistory" element={<Pay />} /> */}
                <Route path="paymenthistory" element={<Paymenthistory />} />
              </Route>
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default Adminroute;
