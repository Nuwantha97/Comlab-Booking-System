import React, { useState, useContext } from 'react';
import '../components/AccountCreation.css';
import NavBarBL from '../components/navBarBL';
import Buttons from '../components/Buttons'
import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext';



export default function AccountCreation() {
  const { setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error('Please fill in all fields.');
      }
      if (!formData.email.endsWith('@eng.jfn.ac.lk')) {
        throw new Error('Only @eng.jfn.ac.lk domain emails are allowed.');
      }
      // Simulate API call (replace with actual API endpoint)
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      setSubmittedData(formData);
      setErrorMessage('');

      // Redirect to user page
      //window.location.href = '/user';

    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again later.');
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Update userData in context
  setUserData(formData);

  return (
    <div>
      <NavBarBL/>
      <div className="page-container-CreatAcc">
          <div className="form-container-creatAcc">
            <h1>Create New Account</h1>  
            <div class="already-registered">
            <h3>Already Registered</h3>
            <Link to="/dashboard">Sign in</Link> </div>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group-creatAcc">
                <label htmlFor="firstName" className="label">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="input" />
              </div>
              <div className="form-group-creatAcc">
                <label htmlFor="lastName" className="label">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="input" />
              </div>
              <div className="form-group-creatAcc">
                <label htmlFor="email" className="label">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input" />
              </div>
              <div className="form-group-creatAcc">
                <label htmlFor="password" className="label">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="input" />
              </div>
              <div className='Button'>
              <Buttons text="Create Account"  borderRadius="10px" width="200px"  />
              </div>
            </form>
            {errorMessage && <p className="error-message-creatAcc">{errorMessage}</p>}
          </div>
      </div>
    </div>
  );
}
