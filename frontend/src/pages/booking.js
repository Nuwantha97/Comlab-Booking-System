import React, { useState } from 'react';
import '../components/booking.css';
import Header from '../components/Header';

export default function MyApp() {
  const [username, setUsername] = useState("");
  const [inviteAttendees, setInviteAttendees] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [description, setDescription] = useState("");
  const [showScheduling, setShowScheduling] = useState(false);

  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    setSelectedDate(formattedDate);
  };

  const handleCheckButton = () => {
    setSelectedRange(`${fromTime} - ${toTime}`);
  };

  const handleSchedulingButtonClick = () => {
    setShowScheduling(true); // Show scheduling div when the button is clicked
  };

  const handleHideScheduling = () => {
    setShowScheduling(false); // Hide scheduling div when the close button is clicked
  };

  return (
    <div>
      <Header />
      <div className="my-app">
        <div className="booking-body">
          <div className="right">
            <div className="Scheduling-button">
              <button className="scheduling" onClick={handleSchedulingButtonClick}>Scheduling poll</button>
            </div>
            {showScheduling && (
              <div className="scheduling-box" style={{ width: '40%', height: '30%', backgroundColor: '#055366', color: 'white' }}>
                <h3>Scheduling Poll</h3>
                <button className="close-button" onClick={handleHideScheduling}>X</button>
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" style={{ width: '150px' }} onChange={handleDateChange}/>
                </div>
              </div>
            )}
            {!showScheduling && (
              <div className="container-11">
                <h3>CO1 Lab Availability</h3>
                <div className="green-rectangle">
                  {selectedDate}
                  <br />
                  {selectedRange}
                </div>
              </div>
            )}
          </div>
          <div className="left">
            <h1>Book Lab Session</h1>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="InviteAttendees">Invite Attendees:</label>
              <input type="text" id="inviteAttendees" name="inviteAttendees" value={inviteAttendees} onChange={(e) => setInviteAttendees(e.target.value)} />
              <label htmlFor="date">Date:</label>
              <div className="inline-container">
                <input type="date" id="date" name="date" style={{ width: '150px' }} onChange={handleDateChange}/>
                <label htmlFor="fromDate">From:</label>
                <input type="text" id="fromDate" name="fromDate" style={{ width: '50px' }} onChange={(e) => setFromTime(e.target.value)} />
                <label htmlFor="toDate">To:</label>
                <input type="text" id="toDate" name="toDate" style={{ width: '50px' }} onChange={(e) => setToTime(e.target.value)} />
                <button className="check-button" onClick={handleCheckButton}>Check</button>
              </div>
              
              <label htmlFor="description">Description (Optional):</label>
              <textarea id="description" name="description" rows="2" cols="30" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short Description"/>
              <div className="button-container">
                <button className="check-button">Save</button>
                <button className="check-button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
