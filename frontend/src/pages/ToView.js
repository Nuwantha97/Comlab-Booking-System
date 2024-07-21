import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const formattedEvents = response.data.map(booking => ({
          id: booking._id,
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
          title: booking.title,
          description: booking.description
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const CustomToolbar = ({ label }) => {
    return (
      <div className="rbc-toolbar" style={{ backgroundColor: '#A6BBC1', padding: '10px' }}>
        <div style={{ color: 'red', display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ marginLeft: '20px' }}>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ padding: '5px', fontSize: '16px' }}
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const month = moment().month(i).format('YYYY-MM');
                return (
                  <option key={month} value={month}>
                    {moment(month, 'YYYY-MM').format('MMMM YYYY')}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const customEventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#00b528',
      color: '#fff',
      borderRadius: '0px',
      border: 'none',
      display: 'block',
      position: 'relative',
      textAlign: 'center',
      height: '100%',
      width: '100%'
    };

    if (!event.start || !event.end) {
      return { style };
    }

    return {
      style,
      children: (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}></div>
      ),
    };
  };

  const customFormats = {
    dayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
    weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture)
  };

  return (
    <div>
      <ToHeader onUserIconClick={() => setIsBoxVisible(!isBoxVisible)} isProfileVisible={isBoxVisible} />
      <div className='view_body'>
        <div className='calendar-container'>
          <div className='calendar-wrapper'>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '800px' }}
              formats={customFormats}
              eventPropGetter={customEventStyleGetter}
              onSelectEvent={handleSelectEvent}
              components={{
                toolbar: CustomToolbar,
              }}
              date={moment(selectedMonth, 'YYYY-MM').toDate()}
              dayPropGetter={date => ({
                className: 'rbc-day-red',
              })}
            />
          </div>
          {selectedEvent && (
            <div className="event-details">
              <button className="close-button" onClick={() => setSelectedEvent(null)}>×</button>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <p>Start: {selectedEvent.start.toLocaleString()}</p>
              <p>End: {selectedEvent.end.toLocaleString()}</p>
            </div>
          )}
        </div>
        {isBoxVisible && <Profile profileRef={profileRef} />}
      </div>
    </div>
  );
}
