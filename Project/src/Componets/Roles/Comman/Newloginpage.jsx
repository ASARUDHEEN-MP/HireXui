import React, { useState } from 'react';
import './NEWLogin.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Feature/Slice/Authslice';
import instance from '../../../axios';

function Newloginpage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
      } else if (error.response.data.message === 'User is not active.') {
        toast.error('User not active. Contact the admin.');
      }
    }
  };

  return (
    <section>
      <div className="signin">
        <div className="content">
          <h2>Log In</h2>
          <div className="form">
            <form onSubmit={handleLogin}>
              <div className="inputBox">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i>Email</i>
              </div>
              <div className="inputBox">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i>Password</i>
                <div
                  className={`show-password ${showPassword ? 'active' : ''}`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👁️'}
                </div>
              </div>
              <div className="links">
              <a href="/forgotpassword">Forgot Password?</a>
                <a href="/signup">Sign up</a>
              </div>
              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Newloginpage;
