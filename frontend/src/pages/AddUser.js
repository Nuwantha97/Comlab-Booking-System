import React, {useState} from 'react'
import HeaderAdmin from '../components/HeaderAdmin';
import Buttons from '../components/Buttons';
import UserImageAdmin from '../images/user-image.png';
import { Link } from 'react-router-dom';
import '../components/adduser.css'
import Profile from '../components/Profile'

export default function AddUser() {
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [textContainerText, setTextContainerText] = useState("Add User Details");


  const handleUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };


  const handleEditButtonClick = () => {
    setTextContainerText("Edit User Details");
};

  return (
    <div className='main-container-admin'>
    
      <HeaderAdmin onUserIconClick={handleUserIconClick} isProfileVisible={isBoxVisible}/>
      <hr style={{height: '2px', backgroundColor: 'black', borderStyle: 'none', margin: 0}}/>
      <div className='container-1-admin'>
        <div className='container-2-admin'>
            <h3 className='text-container-admin'>{textContainerText}</h3>
          

          <div className='user-input-details-admin'>
          <form>
        <label htmlFor="name" className="input-label-admin">First Name</label><br />
        <input
          type="text"
          id="name"
          name="name"
          className="input-field-admin"
        /><br />

        <label htmlFor="name" className="input-label-admin">Last Name</label><br />
        <input
          type="text"
          id="name"
          name="name"
          className="input-field-admin"
        /><br />

        <label htmlFor="password" className="input-label-admin">Password</label><br />
            <input
              type="password"
              id="password"
              name="password"
              className="input-field-admin"
              />

        <label htmlFor="email" className="input-label-admin">Email</label><br />
        <input
          type="text"
          id="email"
          name="email"
          className="input-field-admin"
        /><br />

        <label htmlFor="role" className="input-label-admin">Role</label><br />
        <input
          type="text"
          id="role"
          name="role"
          className="input-field-admin"
        /><br />
      </form>
            
              
              <div className="buttons">
                <Buttons text="Save" borderRadius="50px" width="125px"  height="50px" marginTop="20px" />
                <Link to='/adminhome'>
                <Buttons text="Cancel" borderRadius="50px" width="125px" height="50px" marginTop="20px" />
                </Link>
              </div>
            
          </div>
        </div>
        <div className='container-3-admin'>
        <div className='user-logo-details-admin'>
            <img src={UserImageAdmin} alt="user-photograph" className='userImageAdmin' />
            <Buttons marginTop="30px" text="Add" />
          </div>
        </div>
        {isBoxVisible && <Profile />}
        
      </div>
    </div>
  )
}
