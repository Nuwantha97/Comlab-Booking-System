import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import '../components/View.css'; // Import your CSS file
import ToHeader from '../components/ToHeder';
import Profile from '../components/Profile';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [attendeesInput, setAttendeesInput] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM')); // Default to current month
  const profileRef = useRef(null);
  const eventDetailsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEvents(response.data.map(booking => ({
          id: booking._id,
          title: booking.title,
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
          description: booking.description,
          attendees: booking.attendees || [] // Ensure it's an array
        })));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleEditEvent = () => {
    navigate('/booking', { state: { event: selectedEvent } });
  };

  const handleCancelEvent = () => {
    if (selectedEvent) {
      setIsCancelConfirmationVisible(true);
    }
  };

  const handleConfirmCancel = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/bookings/${selectedEvent.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }

    setIsCancelConfirmationVisible(false);
  };

  const handleCancelCancel = () => {
    setIsCancelConfirmationVisible(false);
  };

  const handleInviteAttendees = () => {
    if (!selectedEvent || !attendeesInput) {
      return;
    }

    const updatedEvent = {
      ...selectedEvent,
      attendees: [...selectedEvent.attendees, attendeesInput]
    };

    const updatedEvents = events.map(event => event.id === selectedEvent.id ? updatedEvent : event);
    setEvents(updatedEvents);
    setAttendeesInput('');
  };

  const CustomToolbar = () => {
    return (
      <div className="rbc-toolbar custom-toolbar">
        <div className="toolbar-container">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '5px', fontSize: '16px' }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const month = moment().month(i).format('YYYY-MM');
              return (
                <option key={month} value={month}>
                  {moment(month).format('MMMM YYYY')}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };

  const handleUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleClickOutside = (event) => {
    if (
      (profileRef.current && !profileRef.current.contains(event.target)) &&
      (eventDetailsRef.current && !eventDetailsRef.current.contains(event.target))
    ) {
      setIsBoxVisible(false);
      setSelectedEvent(null); // Close event-details
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='view_container'>
      <ToHeader onUserIconClick={handleUserIconClick} isProfileVisible={isBoxVisible} />
      <div className='view_body'>
        <div style={{ padding: '50px' }}>
          <div style={{ backgroundColor: 'white' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '600px' }}
              eventPropGetter={(event, start, end, isSelected) => ({
                style: {
                  backgroundColor: '#00B528', // Green color
                },
              })}
              onSelectEvent={handleSelectEvent}
              components={{
                toolbar: CustomToolbar,
              }}
              date={moment(selectedMonth).toDate()} // Set the calendar date to the selected month
            />
          </div>

          {selectedEvent && (
            <div ref={eventDetailsRef} className="event-details">
              <button className="close-button" onClick={() => setSelectedEvent(null)}>×</button>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <p>Start: {selectedEvent.start.toLocaleString()}</p>
              <p>End: {selectedEvent.end.toLocaleString()}</p>
              <p>Attendees:</p>
              <ul>
                {selectedEvent.attendees.map((attendee, index) => (
                  <li key={index} style={{ color: 'white' }}>{attendee}</li>
                ))}
              </ul>
              <div className="button-group">
                <input
                  type="text"
                  value={attendeesInput}
                  onChange={(e) => setAttendeesInput(e.target.value)}
                  placeholder="Add attendee"
                />
                <button onClick={handleInviteAttendees}>Add Attendee</button>
                <button onClick={handleEditEvent}>Edit</button>
                <button onClick={handleCancelEvent}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        
        {isCancelConfirmationVisible && (
          <div className="confirmation-box">
            <h2>Cancel scheduled lab session?</h2>
            <p>You will permanently cancel this scheduled lab session</p>
            <div className="button-group">
              <button className="not-now-button" onClick={handleCancelCancel}>Not now</button>
              <button className="cancel-button" onClick={handleConfirmCancel}>Cancel lab session</button>
            </div>
          </div>
        )}
        {isBoxVisible && <Profile ref={profileRef} />}
      </div>
    </div>
  );
}

export default CalendarView;
