import React, { useState } from 'react';
import './Rsignup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';

function Rsignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phonenumber: '',
    country: '',
    state: '',
    repassword:'',
    role: 'recruter',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    phonenumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    if (
      formData.username.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === '' ||
      formData.phonenumber.trim() === ''
    ) {
      toast.error('All fields are mandatory.');
      newErrors.username = 'All fields are mandatory.';
      return;
    }
    if (!formData.username) {
      toast.error('Username is required');
      newErrors.username = 'Username is required.';
    }

    if (formData.password !== formData.repassword) {
      newErrors.repassword = 'Passwords do not match.';
      toast.error('Passwords do not match.');
      return;
    }
  
    if (!/^\d{10}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = 'Phone number should be 10 digits.';
      toast.error('Phone number should be 10 digits.');
      return;
    }
  
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
      toast.error('Invalid email format.');
      return;
    }
    setErrors(newErrors);

    try {
      // Send registration data to the backend API
      console.log(formData.data)
      const response = await instance.post('recruiter/register-recruiter/', formData);
      navigate('/otp', { state: { email: formData.email, role: formData.role } });
      console.log(response.data);
      // Handle successful registration, e.g., show a success message or redirect
    } catch (error) {
      console.error(error.response.data);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8">
          <div className="card my-5 rounded-3" style={{ maxWidth: '600px' }}>
         
            <img
              src="https://cdn.dribbble.com/users/605032/screenshots/3196252/openwork-1-d.gif"
              className="w-100 rounded-top"
              alt="Sample photo"
            />
            <div className="card-body px-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
             
              <input
                className="mb-4 form-control"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                type="text"
                placeholder="Company Name"
              />
             
              <div className="row">
                <div className="col-md-6">
                  <input
                    className="datepicker mb-4 form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Email"
                  />
                  {errors.username && <p className="error-message">{errors.username}</p>}
                </div>
                
                <div className="col-md-6 mb-4">
                  <select
                    className="form-select"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select a country</option>
                    <option value="India">India</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>

              <select
                className="mb-4 form-select"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select a state</option>
                <option value="Kerala">Kerala</option>
                {/* Add more options as needed */}
              </select>
              <input
                className="mb-4 form-control"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                type="text"
                placeholder="District"
              />
              
              <input
                className="mb-4 form-control"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleInputChange}
                type="text"
                placeholder="Phone Number"
              />
             
              <input
                className="mb-4 form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
              />
              <input
                className="mb-4 form-control"
                name="repassword"
                value={formData.repassword}
                onChange={handleInputChange}
                type="password"
                placeholder="Re-password"
              />

              <button className="mb-4 btn btn-success btn-lg" onClick={handleFormSubmit}>
                Submit
                
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer  className='toaster'/>
    </div>
    
  );
}

export default Rsignup;
