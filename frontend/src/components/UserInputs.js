
import React, { useState } from 'react';
import './userInputs.css'
import Buttons  from './Buttons'


export default function UserInputs() {

  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className='userInputs'>
       <form action="/action_page.php">
            <label htmlFor="name" className="input-label">Name</label><br />
            <input type="text" id="name" name="name" className="input-field" /><br />
            <label htmlFor="password" className="input-label">Password</label><br />
            <div className="input-wrapper">
              <input type="text"
                    id="password"
                    name="password"
                    className="input-field-password"
                    value={password.replace(/./g, '*')} // Display stars instead of characters
                    onChange={handlePasswordChange}
             />
              <Buttons text="Change" />
            </div>            
            <label htmlFor="email" className="input-label">Email</label><br />
            <input type="text" id="email" name="email" className="input-field" /><br />
            <label htmlFor="role" className="input-label">Role</label><br />
            <input type="text" id="role" name="role" className="input-field" /><br />
        </form>

      
    </div>
  )
}
