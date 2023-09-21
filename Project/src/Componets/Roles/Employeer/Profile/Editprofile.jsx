import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import instance from '../../../../axios';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
 function Editprofile(props) {
    const [data, setdata] = useState({});
    
   const userInfoString = localStorage.getItem('userInfo');
   const userinfoo = JSON.parse(userInfoString);
   const userid = userinfoo.userInfo.id;
   const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [email, setEmail] = useState('');
  const[companyregno,setregno]=useState('')
  const [aboutUsText, setAboutUsText] = useState('');
  const navigate = useNavigate();
  

   const [selectedImage, setSelectedImage] = useState(null);
   const [profilePicture, setProfilePicture] = useState(
     'https://images.unsplash.com/photo-1649734926695-1b1664e98842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1hem9uJTIwbG9nbyUyMDNkfGVufDB8fDB8fHww&w=1000&q=80'
   );
 
   useEffect(() => {
    instance
      .get(`recruiter/user-recruiter-details/${userid}/`)
      .then((response) => {
        const userData = response.data;
        setdata(userData);
        setName(userData.user.username);
        setLocation(userData.recruiter_details.country)
        setState(userData.recruiter_details.state)
        setPhoneNumber(userData.user.phonenumber)
        setDistrict(userData.recruiter_details.district)
        setEmail(userData.user.email)
        setAboutUsText(userData.recruiter_details.about_us);
        setregno(userData.recruiter_details.companyregno)
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
         if (response.status === 200) {
           const imageUrl = response.data.image_url;
           setProfilePicture(imageUrl); 
           toast.success(`Image upload Successfully`);// Update the profile picture
         } else {
          toast.error('Image upload failed.');
         }
       }
     } catch (error) {
      toast.error('Error uploading image:', error);
     }
   };
 
   const handleSubmit = async (event) => {
    
     event.preventDefault();
     try {
        const response = await instance.patch(
         `recruiter/user-recruiter-details/${userid}/`,
         {
           user: {
             username: name,
             phonenumber:phoneNumber
             
           },
           recruiter_details: {
             country: location,
             state:state,
             companyregno:companyregno,
             district:district,
             about_us:aboutUsText,
             
           },
         }
       );
 
       // Handle successful response
       toast.success(`Profile Updated Successfully`);
 
       // You might want to update the data state with the updated information
       setdata(response.data);
       navigate('/employeer/profile');
     } catch (error) {
      toast.success('Error updating profile:', error);
     }
   };
 
   if (!data.user) {
     // Data is not fetched yet, show loading or return early
     return <div>Loading...</div>;
   }
 
   
 
   return (
     <div className="profile-page container">
       <header className="header text-center">
         <h1>Edit Profile</h1>
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
           <form onSubmit={handleSubmit}>
             <div className="mb-3">
               <label htmlFor="username" className="form-label">
               Company Name
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="username"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <label htmlFor="location" className="form-label">
                 Location
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="location"
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <label htmlFor="phoneNumber" className="form-label">
                 Phone Number
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="phoneNumber"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
               />
             </div>
             <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
             <div className="mb-3">
               <label htmlFor="district" className="form-label">
                 District
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="district"
                 value={district}
                 onChange={(e) => setDistrict(e.target.value)}
               />
             </div>
             
             <div className="mb-3">
               <label htmlFor="email" className="form-label">
                 Email
               </label>
               <input
                 type="email"
                 className="form-control"
                 id="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <label htmlFor="registrationnumber" className="form-label">
               registrationnumber
               </label>
               <input
                 type="registrationnumber"
                 className="form-control"
                 id="registrationnumber"
                 value={companyregno}
                 onChange={(e) => setregno(e.target.value)}
               />
             </div>
             <div className="mb-3">
            <label htmlFor="aboutUs" className="form-label">
              About Us
            </label>
            <textarea
              className="form-control"
              id="aboutUs"
              value={aboutUsText}
              onChange={(e) => setAboutUsText(e.target.value)}
              rows="6"
              maxLength="300"
            />
          </div>
             <button type="submit" className="btn btn-primary">
               Save Changes
             </button>
           </form>
         </div>
       </div>
{/*        
       <div className="profile-buttons text-center">
         <Link to="/employeer/edit-profile">
           <button className="btn btn-primary">Back to Profile</button>
         </Link>
       </div> */}
         <ToastContainer />
     </div>
   );
 }
 
 export default Editprofile;
 