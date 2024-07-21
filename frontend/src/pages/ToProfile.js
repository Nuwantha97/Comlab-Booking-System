import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../components/toProfile.css';
import userImage from '../images/user-image.png';
import Buttons from '../components/submitButton';
import '../App.css';
import ToHeader from '../components/ToHeder';
import Profile from '../components/Profile';
import axios from 'axios';

export default function ToProfile() {
  const [id, setId] = useState('');
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [textContainerText, setTextContainerText] = useState("Your Account");
  const navigate = useNavigate();
  
  const location = useLocation();
  const token = localStorage.getItem('token');
  console.log(location.state);
  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location.state]);

  useEffect(() => {

    if (id) {

      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/users/getDetails/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const user = response.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setRole(user.role);
          console.log('Fetched user:', user.data);
          setTextContainerText("Edit User Details");
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
  }, [id, token]);

  const handleUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName
    };
    console.log('data',userData);
    try {
      let response;
      if (id) {
        response = await axios.post(`/api/users/updateName/${id}`, userData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        alert('User updated successfully!');
      } 
      navigate('/toHome');
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user');
    }
  };

  const handleChangeClick = () => {
    navigate('/forgotpassword');
  };

  return (
    <div className='main-container'>
      <ToHeader onUserIconClick={handleUserIconClick} isProfileVisible={isBoxVisible} />
      <div className='container-1-to'>
        <div className='container-2-to'>
          <div className='user-logo-details-to'>
            <h3 className='text-1'>{textContainerText}</h3>
            <img src={userImage} alt="user-photograph" className='userImage-to' />
            <Buttons text="Edit" />
          </div>

          <div className='user-input-details-to'>
            <div className="inputs-wrapper-to">
              <div className='userInputs-to'>
                <form onSubmit={handleSave} className='form-container-to'>
                  <label htmlFor="name" className="input-label-to">Name</label><br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-field-to"
                    value={`${firstName} ${lastName}`}
                    onChange={(e) => {
                      const [first, ...last] = e.target.value.split(" ");
                      setFirstName(first);
                      setLastName(last.join(" "));
                    }}
                  /><br />
                  <label htmlFor="password" className="input-label-to">Password</label><br />
                  <div className="input-wrapper-to">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="input-field-password-to"
                      value={password}
                    /><br />
                    <button type="button" className="changeButton-to" onClick={handleChangeClick}>Change</button>
                  </div>
                  <label htmlFor="email" className="input-label-to">Email</label><br />
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="input-field-to"
                    value={email}
                  /><br />
                  <label htmlFor="role" className="input-label-to">Role</label><br />
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="input-field-to"
                    value={role}
                  /><br />
                  <div className="button-save-to">
                    <Buttons type="submit" text="Save" borderRadius="50px" width="125px" height="50px" marginTop="20px" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isBoxVisible && <Profile />}
    </div>
  );
}
