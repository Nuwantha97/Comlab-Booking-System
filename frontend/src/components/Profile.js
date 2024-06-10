import React, { useContext } from 'react';
import userIconProfile from '../images/user.png';
import Buttons from '../components/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import settingIcon from '../images/setting_icon.png';
import '../components/profile.css';
import { UserContext } from '../components/UserContext';

export default function Profile() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfileSettingsClick = () => {
    if (userData.role === 'admin') {
      navigate('/adminprofile');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className='profile-container'>
      <div className='containerProfile-2'>
        <img src={userIconProfile} alt="user-icon" className='userIconProfile' />
        <div className='info'>
          <h4 style={{ fontSize: '24px', lineHeight: '36px', textAlign: 'center', fontWeight: '400' }}>
            {`${userData.firstName} ${userData.lastName}`}
          </h4>
          <h4 style={{ fontSize: '18px', lineHeight: '24px', textAlign: 'center', fontWeight: '400' }}>
            {userData.email}
          </h4>
        </div>
        <Link to="/"> 
          <Buttons text="Sign out" borderRadius="50px" width="175px" height="60px" marginTop="25px" />
        </Link>
      </div>
      <div className='containerProfile-3'>
        <img src={settingIcon} alt="setting-icon" className='settingIcon' />
        <span className='profile-settings-text' onClick={handleProfileSettingsClick}>
          Profile settings
        </span>
      </div>
    </div>
  );
}
