import React from 'react'
import { Link } from 'react-router-dom';
import NavBarBL from '../components/NavBarBL';
import  '../components/home.css';
import Buttons from '../components/Buttons'


export default function Home() {
  return (
    <div>
      <NavBarBL />
      <div className='home' >
        <div className='text-home'>
          <h1>CO1 Lab Booking</h1>
          <h1>System</h1>
          <h3>Welcome to the Lab Booking System Dashboard!</h3>
          <p>
           Reserve Lab Spaces: Book lab sessions seamlessly.<br />
           Check availability, confirm bookings, and manage your lab schedule<br />
          </p>
          <br />
          <div  className='button-row'>
            <Link to ="/booking">
              <Buttons text="Sign in"  borderRadius="0" width="95px"  />
            </Link>
            <Link to ="/signup" >
              <Buttons text="Sign up"  borderRadius="0" width="95px"  />
            </Link>
          </div>
        </div>              
      </div> 
    </div>
  );
}
