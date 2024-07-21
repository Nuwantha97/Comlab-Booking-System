import React, { useState, useEffect,useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import '../components/View.css';
import ToHeader from '../components/ToHeder';
import Profile from '../components/Profile';

const localizer = momentLocalizer(moment);

export default function CalendarViewTo() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendeeTypes, setAttendeeTypes] = useState({});
  const profileRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEvents(response.data.map(booking => ({
          id: booking._id, // Add booking ID for deletion
          title: booking.title,
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
          description: booking.description,
          attendees: booking.attendees // Assuming attendees is an array of strings
        })));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [token]);

  const handleSelectEvent = async (event) => {
    setSelectedEvent(event);
    try {
      const response = await axios.get(`/api/notification/attendeesAndTypeByBookingId/${event.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const attendeeTypesData = response.data.reduce((acc, obj) => {
        const [email, type] = Object.entries(obj)[0];
        acc[email] = type;
        return acc;
      }, {});
      setAttendeeTypes(attendeeTypesData);
      console.log(attendeeTypesData)
    } catch (error) {
      console.error('Error fetching attendee types:', error);
    }
  };

  const CustomToolbar = ({ onNavigate }) => {
    return (
      <div className="rbc-toolbar" style={{ backgroundColor: '#A6BBC1', padding: '10px' }}>
        <div style={{ color: '#638793', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div>
            <button onClick={() => onNavigate('PREV')}>&lt; Prev</button>
            <button onClick={() => onNavigate('NEXT')}>Next &gt;</button>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <div style={{ color: '#fff' }}>
              <div style={{ backgroundColor: '#638793', width: '120px', height: '50px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
                {moment(currentDate).format('MMMM YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsBoxVisible(false);
    }
  };

  useEffect(() => {
    if (isBoxVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBoxVisible]);

  return (
    <div>
      <ToHeader onUserIconClick={handleUserIconClick} isProfileVisible={isBoxVisible}/>
      <div className='view_body'>
        <div style={{ padding: '50px' }}>
          <div style={{ backgroundColor: 'white' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '600px' }}
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)}
              eventPropGetter={(event, start, end, isSelected) => ({
                style: {
                  backgroundColor: '#00B528', // Green color
                },
              })}
              onSelectEvent={handleSelectEvent}
              components={{
                toolbar: CustomToolbar,
              }}
            />
          </div>
          {selectedEvent && (
            <div className="event-details">
              <div className="view-close-button" onClick={() => setSelectedEvent(null)}>&times;</div> {/* Add close button */}
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <p>Start: {selectedEvent.start.toLocaleString()}</p>
              <p>End: {selectedEvent.end.toLocaleString()}</p>
              <p>Attendees:</p>
              <div className="attendees-list">
                {selectedEvent.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className={`attendee-box ${attendeeTypes[attendee]}`}
                  >
                    {attendee}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {isBoxVisible && <Profile profileRef={profileRef} />}
      </div>
    </div>
  );
}
