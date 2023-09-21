import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Feature/Slice/Authslice';
import instance from '../../../axios';
import './Login.css';
import Cookies from 'js-cookie';

function Login({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await instance.post('login/', { email, password });

      if (response.status === 200) {
        if (response.data && response.data.userInfo) {
          const userInfo = response.data.userInfo;
          toast.success(`Welcome ${userInfo.email}`);
          const tokenString = JSON.stringify(response.data.token);
          Cookies.set('AdminTokens', tokenString);
          let role = '';

          if (userInfo.is_superuser) {
            role = 'admin';
            navigate('/admin/dashboard', { replace: true });
          } else if (userInfo.is_recruiter) {
            role = 'recruiter';
            navigate('/employeer/applicants-list', { replace: true });
          } else if (userInfo.is_employee) {
            role = 'user';
            navigate('/user/home', { replace: true });
          }

          dispatch(setCredentials({ userInfo, role }));
        } else {
          console.error('Login failed: Unexpected response data', response.data);
          setError('Unexpected response from the server.');
          toast.error('Unexpected response from the server.');
        }
      } else {
        console.error('Login failed:', response.data.message);
        setError(response.data.message);
        toast.error('Invalid email or password.');
      }
    } catch (error) {
      console.log(error.response.data, 'hlllllllllllll');

      if (error.response.data.invalid === 'Invalid password') {
        toast.error('Invalid password.');
      } else if (error.response.data.message === 'User not found.') {
        toast.error('User not found.');
      }
    }
  };

  return (
    
    <div className="parentContainer">
      
      <MDBContainer fluid className="p-4 mt-5">
        <MDBRow>
          <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
            <h1 className="my-4 display-3 fw-bold ls-tight px-3">
              One click
              <br />
              <span className="text-primary"> Apply using HireX Profile.</span>
            </h1>
            <img className="my-4 img-fluid" src="https://quantumhunts.com/user/assets/images/hero/hiring-manager-quantumhunts.gif" alt="Netflix Logo" />
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="loginform">
              <MDBCardBody className="p-5">
                <form onSubmit={handleLogin}>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12">
                      <div className="password-container">
                        <MDBInput
                          label="Password"
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <a className="show" onClick={togglePasswordVisibility}>
                          {showPassword ? 'Hide Password' : 'Show Password'}
                        </a>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12">
                      <p>
                        <a href="/forgotpassword">Forgot Password?</a>
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12">
                      <MDBBtn className="w-100 mb-4" size="md" type="submit">
                        Login
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12" className="text-center">
                      <p>
                        Don't have an account? <a href="/signup">Sign up</a>
                      </p>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
}

export default Login;
