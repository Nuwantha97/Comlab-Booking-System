import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../components/View.css'; // Import your CSS file
import Header from '../components/Header';

const localizer = momentLocalizer(moment);

function CalendarView({ bookings }) {
  const [events, setEvents] = useState(bookings);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setEvents(bookings);
  }, [bookings]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleEditEvent = () => {
    // Add your logic for editing the event
    console.log('Edit event');
  };

  const handleCancelEvent = () => {
    // Remove the selected event from the events array
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    setSelectedEvent(null); // Clear the selectedEvent state
  };
  const CustomToolbar = () => {
    return (
      <div className="rbc-toolbar" style={{ backgroundColor: '#A6BBC1', padding: '10px' }}>
        <div style={{ color: '#638793', display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ marginLeft: '20px' }}>
            <div style={{ color: '#fff' }}>
              <div style={{ backgroundColor: '#638793', width: '120px', height: '50px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
                {moment().format('MMMM')} {moment().format('YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div>
      <Header />
      <div className='view_body'>
      <div style={{ padding: '50px' }}>
        <div style={{backgroundColor:'white'}}>
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
        />
      </div>
      {selectedEvent && (
        <div className="event-details">
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <p>Start: {selectedEvent.start.toLocaleString()}</p>
          <p>End: {selectedEvent.end.toLocaleString()}</p>
          <div className="button-group">
            <button onClick={handleEditEvent}>Edit</button>
            <button onClick={handleCancelEvent}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default CalendarView;
