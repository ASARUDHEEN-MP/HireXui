import React, { useState } from 'react';
import './ForgetPassword.css'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../../axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => { // Add 'async' here
    e.preventDefault();
    
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error('Invalid email format.');
      return;
    }
    
    try {
      // Send email for resetting password to the backend API
      const response = await instance.post('forgotpassword/', { email });
      // Handle successful email sending, e.g., show a success message or redirect
      toast.success('Password send to email You can change The Password From  Profile.');
      navigate('/login');
    } catch (error) {
        if (error.response.data.message === 'User with this email does not exist.') {
            toast.error('User with this email does not exist.');
          }else{
            toast.error('Failed to send password reset email.');
          }
     
    }
  };

  return (
    <div>
      <div className="forget-password-container">
        <h2>Forgot Password</h2>
        <p>Please enter your email to reset your password.</p>
        <form className="forget-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
