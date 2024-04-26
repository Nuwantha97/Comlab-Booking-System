import React from 'react';
import './App.css';

function MyButton() {
  return (
    <button className="my-button">
      Scheduling Poll
    </button>
  );
}

export default function MyApp() {
  return (
    <div className="my-app">
      <h1>Book Lab Session</h1>
      <MyButton />
      <div className="container">
        <h3>CO1 Lab Availability</h3>
      </div>
      <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="username">Invite Attendees:</label>
          <input type="text" id="username" name="username" />
      </div>
    </div>
  );
}


