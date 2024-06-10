import React,{useContext} from 'react';
import '../components/user.css';
import HeaderAdmin from '../components/HeaderAdmin';
import userImage from '../images/user-image.png';
import Buttons from '../components/Buttons';
import UserInputs from '../components/UserInputs';
import '../App.css';
import { UserContext } from '../components/UserContext';



export default function AdminProfile() {
  const { userData } = useContext(UserContext);
  return (    <div className='main-container'>
      <HeaderAdmin />
      <div className='container-1'>
        <div className='container-2'>
          <div className='user-logo-details'>
            <h3 className='text-1'>Your Account</h3>
            <img src={userImage} alt="user-photograph" className='userImage' />
            <Buttons text="Edit" />
          </div>

          <div className='user-input-details'>
            <div className="inputs-wrapper">
              <UserInputs userData={userData}/>
              <div className="button-save">
                <Buttons text="Save" borderRadius="50px" width="90px" marginTop="20px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
