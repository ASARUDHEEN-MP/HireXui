import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import instance from '../../../../axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Userprofile() {

  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [data, setdata] = useState({});
  
  
  useEffect(() => {
    instance
      .get(`/user-details/${userid}/`)
      .then((response) => {
        const userData = response.data;
        console.log(response.data)
        setdata(userData);
        setProfilePicture(userData.image_url.image_url);
        
      })  
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userid]);
  
//   if (!data.user) {
//     // Data is not fetched yet, show loading or return early
//     return <div>Loading...</div>;
//  }













  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected image
      
    }
  };

const handleImageUpload = async () => {
    try {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('user', userid);
            
            
            const response = await instance.post('/upload-image/', formData);
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log(response.data)
                console.log("hello image")
                const imageUrl = response.data.image_url;
                toast.success(`Image upload Successfully`);
                setProfilePicture(imageUrl); // Update the profile picture
              } else {
                console.error('Image upload failed.');
              }
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        };



  return (
    <Container fluid style={{ padding: 0, margin: 0 }} className='conta'>
     <div className='custom-box'>
     <label htmlFor="profile-pic-upload" className="profile-picture">
  <img
        src={profilePicture}
        alt="Profile"
        className="img-fluid"
      />
    <div className="overlay">
        <i className="fas fa-camera"></i>
        <p>Change Photo</p>
      </div>
  </label>
  <input
      type="file"
      id="profile-pic-upload"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: 'none' }}
    />
  <button onClick={handleImageUpload} className='btn btn-primary '>
    Upload Image
  </button>
  <div>
    <div className='name'>{data.user?.username}</div>
    <div className='email'>{data.user?.email}</div>
    <div className='email'>{data.user?.phonenumber}</div>
  </div>
  <div className='social-icons'>
    <a href='#'><i className='fab fa-instagram'></i></a>
    <a href='#'><i className='fab fa-github'></i></a>
  </div>
  
</div>

      
      <div className='square-box'>
        <Row className='section-row mt-2'>
        <div className='about-heading mt-3 ml-3'>
              <span>About</span>
            </div>
          <Col xs={12} md={3} className='profile-sidebar'>
            
            <div className='section-box'>
              <div className='icon-text'>
                <i className='fa fa-briefcase'></i>
                <span>Experience</span>
              </div>
              <p>{data.userdetails?.experience}</p>
            </div>
          </Col>
          <Col xs={12} md={3} className='profile-sidebar'>
            <div className='section-box'>
              <div className='icon-text'>
                <i className='fa fa-money'></i>
                <span>Expected Salary</span>
              </div>
              <p>${data.userdetails?.Expected_salary} per year</p>
            </div>
          </Col>
          <Col xs={12} md={3} className='profile-sidebar'>
            <div className='section-box'>
              <div className='icon-text'>
                <i className='fa fa-map-marker'></i>
                <span>Location</span>
              </div>
              <p>{data.userdetails?.location}</p>
            </div>
          </Col>
          <Col xs={12} md={3} className='profile-sidebar'>
            <div className='section-box'>
              <div className='icon-text'>
                <i className='fa fa-map-marker'></i>
                <span>Postion</span>
              </div>
              <p>{data.userdetails?.position}</p>
            </div>
          </Col>

        </Row>
        <Row className='section-row mt-2'>
          <Col xs={12} md={12} className='profile-main'>
  <div className='about-heading mt-3 ml-3'>
    <span className='underline'>Current Job</span>
  </div>
  <div className='description'>
    <p className='descriptiontext'>
    {data.userdetails?.current_position}
    </p>
  </div>
  </Col>
  </Row>
  <Row className='section-row mt-2'>
          <Col xs={12} md={12} className='profile-main'>
  <div className='about-heading mt-3 ml-3'>
    <span className='underline'>Skills</span>
  </div>
  <div className='description'>
    <p className='descriptiontext'>
    {data.userdetails?.skills
}
    </p>
  </div>
  </Col>
  </Row>
  <Row className='section-row mt-2'>
          <Col xs={12} md={12} className='profile-main'>
  <div className='about-heading mt-3 ml-3'>
    <span className='underline'>Education</span>
  </div>
  <div className='description'>
    <p className='descriptiontext'>
    {data.userdetails?.education}
    </p>
  </div>
  </Col>
  </Row>
  <Row className='section-row mt-2'>
          <Col xs={12} md={12} className='profile-main'>
  <div className='about-heading mt-3 ml-3'>
    <span className='underline'>Worked Companys</span>
  </div>
  <div className='description'>
    <p className='descriptiontext'>
    {data.userdetails?.worked_company}
    </p>
  </div>
  </Col>
  </Row>
  <div >
  <div className='button-container'>
        <button className='btn btn-primary rounded-pill upload-button'>Upload CV</button>
        <button className='btn btn-secondary rounded-pill edit-button'>
  <Link to="/user/editprofile">Edit Profile</Link>
</button>
      </div>
    </div>

      </div>
      <ToastContainer />
    </Container>
  );
}

export default Userprofile;
