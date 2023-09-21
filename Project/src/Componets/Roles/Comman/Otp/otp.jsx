import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import instance from '../../../../axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Otp.css'; // Make sure to import the CSS file

function Otp() {
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const intotp = otp.join('');
      const otpVerificationEndpoint = location.state.role === 'user' ? '/verify-otp/' : '/recruiter/verify-recruiter/';
      const response = await instance.post(otpVerificationEndpoint, {
        email: location.state.email,
        otp: intotp,
      });

      console.log(response.data);
      navigate('/login');

      // Handle successful OTP verification
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
      setError(error.response.data);
      console.error('Error verifying OTP:', error);
      // Handle error and display error messages to the user
    }
  };

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-Form" onSubmit={handleOtpSubmit}>
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We have sent a verification code to your Email
        </p>
        <div className="inputContainer">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`} // Add unique ID for each input
              required
              maxLength="1"
              type="text"
              className="otp-input"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
            />
          ))}
        </div>
        <MDBBtn className="verifyButton" type="submit">
          Verify
        </MDBBtn>
        <p className="resendNote">
          Didn't receive the code?{' '}
          <button className="resendBtn">Resend Code</button>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Otp;
