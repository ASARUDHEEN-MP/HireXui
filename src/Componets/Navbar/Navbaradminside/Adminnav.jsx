import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './Adminsidebar.css';
import { SidebarData } from './SidebarData';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Feature/Slice/Authslice';


function Adminnav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const roles = localStorage.getItem('userRole');
    dispatch(logout());

    if (roles === 'admin') {
      navigate('/login');
      console.log('Logged out as admin');
    }
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      {/* <div className='navbar'>
        <Link to='/#' className='menu-bars'>
          <FaIcons.FaBars />
        </Link>
      </div> */}
      <nav className='nav-menu active'>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <Link to='/#' className='menu-bars'>
              HireX
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className='nav-text'>
            <Link to='/login' className='nav-link' onClick={handleLogout}>
              <FaIcons.FaSignOutAlt />
              <span>Logouts</span>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Adminnav;
