import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import './Navbar.css';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Feature/Slice/Authslice';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [showNavRight, setShowNavRight] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    const roles = localStorage.getItem('userRole');
    dispatch(logout());
    toast.success('Logged out successfully');
    if (roles === 'admin') {
      navigate('admin/');
    }
    if (roles === 'recruiter') {
      navigate('/login');
    }
  };

  return (
    <div>

{!role && (
  <MDBNavbar expand='lg' bgColor='transparent' className='custom-navbar'>
    <MDBContainer fluid className='test'>
      {/* Brand Name */}
      <a href='/login'>
        <img className='logo' src="https://res.cloudinary.com/dbsvyx064/image/upload/v1693765945/xostqqogehp0px9diyki.png" alt="Logo" />
      </a>
      <MDBNavbarItem>
        <MDBNavbarLink className='company-title'>
          <span className='click-here'>
            <a href='/companysignup'>Register a Company{' '}</a>
          </span>
        </MDBNavbarLink>
      </MDBNavbarItem>
    </MDBContainer>
  </MDBNavbar>
)}


      {/* user navbar */}
      

      {/* user profile */}
      

      {/* Employer */}
      {role === 'recruiter' && (
        <div>
          <MDBNavbar expand='lg' bgColor='transparent' className='custom-navbar'>
            <MDBContainer fluid className='test'>
              {/* Brand Name */}
              <a href='/login'>
                <img className='logo' src="https://res.cloudinary.com/dbsvyx064/image/upload/v1693765945/xostqqogehp0px9diyki.png" alt="Logo" />
              </a>

              {/* Navbar Toggler */}
              <MDBNavbarToggler
                type='button'
                data-target='#navbarRightAlignExample'
                aria-controls='navbarRightAlignExample'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavRight(!showNavRight)}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>

              {/* Navbar Collapse */}
              <MDBCollapse navbar show={showNavRight}>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0 '>
                  <MDBNavbarLink active aria-current='page' href='/employeer/applicants-list'>
                    Home
                  </MDBNavbarLink>
                  <MDBNavbarItem>
                    <MDBNavbarLink href=''></MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='postview'>Posts</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href=''></MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='postplan'>Plans</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href=''></MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link'>
                        Profile
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem href='profile' link>Profile</MDBDropdownItem>
                        <MDBDropdownItem href='Wallet' link>Wallet</MDBDropdownItem>
                        <MDBDropdownItem link className="text-decoration-none" onClick={handleLogout}>
                          Logout
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='chat-list'>
                      <i className="fas fa-envelope"></i> Messages
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default Navbar;
