import React, { useState } from 'react'; // Import useState from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './Usernavbar.css'; // Import your custom CSS file
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Feature/Slice/Authslice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function UserNavbar() {
  const navigate = useNavigate();
 

  const [searchQuery, setSearchQuery] = useState(''); // Declare searchQuery state using useState
  const handleMessage = () => {
    // Handle the message click event
    navigate('/user/chat-view');
  };
  
  const handleSearch = async () => {
    try {
      console.log('Searching for jobs with query:', searchQuery);
  
      const response = await fetch(`http://18.191.143.204/search-jobposts/?skills=${searchQuery}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        navigate('/user/joblist', { state: { searchResults: data } });
  
        // You can set the data in your component state or perform any other actions with it.
      } else {
        console.error('Error searching for jobs:', response.status);
      }
    } catch (error) {
      console.error('Error searching for jobs:', error);
    }
  };
  

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const followersData = [
    { id: 1, name: 'Follower 1' },
    { id: 2, name: 'Follower 2' },
    { id: 3, name: 'Follower 3' },
    // Add more followers as needed
  ];
  const [showFollowers, setShowFollowers] = useState(false);

  const handleFollowersClick = () => {
    setShowFollowers(true);
  };
  
  const handleCloseFollowers = () => {
    setShowFollowers(false); // Toggle the visibility of the modal
  };



  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top" variant="light">
  <Container fluid>
    <Navbar.Brand href="" className="">
      <img
        src="https://res.cloudinary.com/dbsvyx064/image/upload/v1693765945/xostqqogehp0px9diyki.png"
        alt="HireX Logo"
        width="70"
        height="50"
      />
    </Navbar.Brand>
    <Navbar.Toggle className="navbar-toggler" aria-controls="navbarScroll">
      <i className="fas fa-bars"></i>
    </Navbar.Toggle>
    <Navbar.Collapse id="navbarScroll">
      <Nav className="mx-auto" scroll>
        <Nav.Link href="/user/home" className="nav-link-effect">Home</Nav.Link>
        <Nav.Link href="joblist" className="nav-link-effect">Job</Nav.Link>
        <NavDropdown title="Profile" id="navbarScrollingDropdown" className="nav-link-effect">
          <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="jobstatusview">Job Status</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5" onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2 bg-light border-0 rounded-pill px-3"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" className="rounded-pill px-4" onClick={handleSearch}>
          <i className="fas fa-search"></i>
        </Button>

        {/* Message icon and button */}
      {/* Message icon */}
      <OverlayTrigger
  placement="top"
  overlay={<Tooltip id="message-tooltip">Messages</Tooltip>}
  flip
>
  <button className="btn btn-icon rounded-pill ms-2" onClick={handleMessage}>
    <i className="fas fa-envelope"></i>
  </button>
</OverlayTrigger>

{/* Followers icon */}
<div>
      {/* Button to show followers */}
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="followers-tooltip">Followers</Tooltip>}
        flip
      >
        <button
          className="btn btn-icon rounded-pill ms-2"
          onClick={handleFollowersClick}
        >
          <i className="fas fa-users"></i>
        </button>
      </OverlayTrigger>

      {/* Modal or box to display followers */}
      {showFollowers && (
        <div className="followers-modal">
          <div className="followers-content">
            <h3>Followers List</h3>
            <ul>
              {followersData.map((follower) => (
                <li key={follower.id}>{follower.name}</li>
              ))}
            </ul>
            <button onClick={handleCloseFollowers}>Close</button>
          </div>
        </div>
      )}
    </div>

      </Form>
    </Navbar.Collapse>
    
  </Container>

</Navbar>

  );
}

export default UserNavbar;
