import React, { useState } from 'react';
import Header from '../components/Header'
import Buttons from '../components/Buttons'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields.');
      }
      // Simulate API call (replace with actual API endpoint)
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      console.log('User logged in successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
        <Header/>
    <div>
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="label" >Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </div>
  );
}
