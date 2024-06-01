import React, { useState } from 'react';
import '../components/booking.css';
import Header from '../components/Header';

function MyButton() {
  return (
    <button className="my-button">
      Scheduling Poll
    </button>
  );
}

export default function MyApp() {
  const [selectedDate, setSelectedDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedRange, setSelectedRange] = useState("");

  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    setSelectedDate(formattedDate);
  };

  const handleCheckButton = () => {
    setSelectedRange(`${fromTime} - ${toTime}`);
  };

  return (
    <div>
      <Header />
      <div className="my-app">
        <div className="booking-body">
          <h1>Book Lab Session</h1>
          <MyButton />
          <div className="container-11">
            <h3>CO1 Lab Availability</h3>
            <div className="green-rectangle">
              {selectedDate}
              <br />
              {selectedRange}
            </div>

          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="InviteAttendees">Invite Attendees:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="date">Date:</label>
            <div className="inline-container">
              <input type="date" id="date" name="date" style={{ width: '150px' }} onChange={handleDateChange}/>
              <label htmlFor="fromDate">From:</label>
              <input type="text" id="fromDate" name="fromDate" style={{ width: '50px' }} onChange={(e) => setFromTime(e.target.value)} />
              <label htmlFor="toDate">To:</label>
              <input type="text" id="toDate" name="toDate" style={{ width: '50px' }} onChange={(e) => setToTime(e.target.value)} />
              <button className="check-button" onClick={handleCheckButton}>Check</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
