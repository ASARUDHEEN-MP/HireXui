import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import instance from '../../../../axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
   
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;
  const [data, setdata] = useState({});
 
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState("");
    
    

   
    useEffect(() => {
        instance
          .get(`recruiter/user-recruiter-details/${userid}/`)
          .then((response) => {
            const userData = response.data;
            setdata(userData);
            setProfilePicture(userData.image_url.image_url);
            
          })  
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, [userid]);
      if (!data.user) {
        // Data is not fetched yet, show loading or return early
        return <div>Loading...</div>;
     }
      
    
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
                    setProfilePicture(imageUrl); 
                    toast.success(`Image upload Successfully`);// Update the profile picture
                  } else {
                    console.error('Image upload failed.');
                  }
                }
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            };

  const userData = {
    name: data.user.username,
    title: 'Web Developer',
    location: data.recruiter_details.country,
    phoneNumber: data.user.phonenumber,
    state: data.recruiter_details.state,
    district: data.recruiter_details.district,
    companyName: data.user.username,
    registrationNumber: data.recruiter_details.companyregno,
    email: data.user.email,
    about_us: data.recruiter_details.about_us,
  };
 
 
  return (
    <div className="profile-page container ">
      <header className="header text-center">
        <h1>My Profile</h1>
      </header>
       <div className="profile-info row">
       <div className="col-md-4">
  <div className="text-center">
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
    <button onClick={handleImageUpload} className="btn btn-primary mt-2">
      Upload Image
    </button>
  </div>
</div>

        <div className="user-details col-md-8">
          <h2>{userData.name}</h2>
          <p>{userData.title}</p>
          <p>Location: {userData.location}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>State: {userData.state}</p>
          <p>District: {userData.district}</p>
          <p>Company Name: {userData.companyName}</p>
          <p>Registration Number: {userData.registrationNumber}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>
      <div className="about-us">
        <h2>About Us</h2>
        <p>{userData.about_us}</p>
      </div>
      <div className="profile-buttons text-center">
        <Link to="/employeer/edit-profile">
          <button className="btn btn-primary">Edit</button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
