import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarBL from '../components/navBarBL';
import '../components/signIn.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Buttons from '../components/Buttons'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    };

    try {
      console.log('Attempting to log in with:', loginData);
      const response = await axios.post('/api/auth/login', loginData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login response:', response);
      alert('Admin Login Successful');
      navigate('/AdminDashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error');
      }
    }
  };

  return (
    <div>
      <NavBarBL />
      <div className="page-container-login">
        <div className="form-container-login">
          <h1>Change Password</h1>
          <h3>Sign in to continue</h3>
          <form className="form" onSubmit={sendData}>
            <div className="form-group-login">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Enter the email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group-login">
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgotpassword" style={{textDecoration:'underline'}}>Forgot password?</Link>
            </div>
            <Link to ="/adminhome" >
              <Buttons text="Submit"  borderRadius="0" width="95px"  />
            </Link>
          </form>
          {errorMessage && <p className="error-message-login">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
