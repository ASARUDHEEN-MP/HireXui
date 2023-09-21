import React, { useState } from 'react';
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../../axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phonenumber: '',
    role:'user',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (
      formData.username.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === '' ||
      formData.phonenumber.trim() === ''
    ) {
      toast.error('All fields are mandatory.');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email format.');
      return;
    }

    if (!validatePhoneNumber(formData.phonenumber)) {
      toast.error('Phone number should be 10 digits.');
      return;
    }

    try {
      const response = await instance.post('/register/', formData);
      console.log(response.data);
      navigate('/otp', { state: { email: formData.email, role: formData.role } });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.email[0]);
      } else if (error.request) {
        toast.error('No response received from the server.');
      } else {
        toast.error('Error occurred while making the request.');
      }
    }
  };

  return (
    <div className="custom-parent-container">
    <div className="custom-container-fluid custom-padding-4 custom-margin-top-5">
      <div className="custom-row">
        <div className="custom-col-md-6 custom-text-center custom-text-md-start custom-flex-column custom-justify-content-center">
          <h1 className="custom-heading my-5 custom-display-3 custom-fw-bold custom-ls-tight custom-px-3">
            HireX <br />
            <span className="custom-text-primary">On registering, you can</span>
          </h1>
          <p className="custom-paragraph px-3" style={{ color: 'hsl(217, 10%, 50.8%)' }}>
          With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you are looking for new job opportunities.
          </p>
        </div>
          <div className="custom-col-md-6">
            <div className="custom-card custom-my-5">
              <div className="custom-card-body custom-p-5">
                <form onSubmit={handleFormSubmit}>
                  <div className="custom-mb-4">
                    <label htmlFor="username">Username</label>
                    <input
                      className="custom-form-control"
                      type="text"
                      name="username"
                      value={formData.username}
                      id="username"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="custom-mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                      className="custom-form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      id="email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="custom-mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      className="custom-form-control"
                      type="password"
                      name="password"
                      value={formData.password}
                      id="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="custom-mb-4">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input
                      className="custom-form-control"
                      type="text"
                      name="phonenumber"
                      value={formData.phonenumber}
                      id="phonenumber"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="custom-btn custom-btn-primary w-100 custom-mb-4" type="submit">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
