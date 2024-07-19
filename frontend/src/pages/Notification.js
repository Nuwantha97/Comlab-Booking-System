import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../components/notification.css';
import Profile from '../components/Profile';

const token = localStorage.getItem('token');



export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [labDetails, setLabDetails] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notification/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNotifications(response.data);
        setFilteredNotifications(response.data);
        console.log('Fetched notifications:', response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [token]);

  useEffect(() => {
    filterNotifications(selectedType);
  }, [selectedType, notifications]);


  const filterNotifications = (type) => {
    if (type === 'unread') {
      setFilteredNotifications(notifications.filter(notification => !notification.isRead));
    } else if (type === 'reminder') {
      const now = new Date();
      const nearbyReminders = notifications.filter(notification => {
        const labStartTime = new Date(notification.labDate);
        const timeDiff = labStartTime.getTime() - now.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        return (labStartTime.toDateString() === now.toDateString() && minutesDiff <= 30 && minutesDiff >= 0);
      });
      setFilteredNotifications(nearbyReminders);
    } else if (type === '') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(notification => notification.type === type));
    }
  };

  const handleButtonClick = (type) => {
    setSelectedType(type);
    setLabDetails(null);
    setSelectedNotification(null);
    setIsDialogVisible(false);
  };

  const handleNotificationClick = (notification) => {
    setLabDetails(notification);
    setSelectedNotification(notification);
    setIsDialogVisible(true);
  };


  const handleOkClick = async () => {
    console.log('handleOKClick called');


    if (!selectedNotification) {
      console.error('No selected notification');
      return;
    }

    try {
      const response = await axios.put(`/api/notification/markRead/${selectedNotification._id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Marked notification as read:', response.data);

      const updatedNotifications = notifications.map(notif =>
        notif._id === selectedNotification._id ? { ...notif, isRead: true } : notif
      );
      setNotifications(updatedNotifications);
      setFilteredNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }

    setIsDialogVisible(false);
  };

  const handleAcceptClick = async () => {
    try {
      const response = await axios.post(
        `/api/notifications/updateIsReceiverConfirm/${selectedNotification._id}/${selectedNotification.bookingId}`, 
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Updated isReceiverConfirm and booking status:', response.data);
    } catch (error) {
      console.error('Error updating isReceiverConfirm and booking status:', error);
    }
    setIsDialogVisible(false);
  };

  const handleCancelClick = async () => {
    setIsDialogVisible(false);
  };

  const handleConClick = async () => {
    setIsDialogVisible(false);
  };

  const handleUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  return (
    <div>
      <Header onUserIconClick={handleUserIconClick} isProfileVisible={isBoxVisible} />
      <div className="notification-container">
        <div className="left-side">
          <h2 className='title'>Notifications</h2>
          <ul className='toolbars'>
            <button className="toolbar-button" onClick={() => handleButtonClick('')}>All</button>
            <button className="toolbar-button" onClick={() => handleButtonClick('unread')}>Unread</button>
            <button className="toolbar-button" onClick={() => handleButtonClick('request')}>Requests</button>
            <button className="toolbar-button" onClick={() => handleButtonClick('cancellation')}>Cancellations</button>
            <button className="toolbar-button" onClick={() => handleButtonClick('reminder')}>Reminders</button>
            <button className="toolbar-button" onClick={() => handleButtonClick('booking_confirmation')}>Booking Confirmations</button>
          </ul>
        </div>
        <div className="right-side">
          <div className="scroll-container">
            <ul className="preview-list">
              {filteredNotifications.map((notification, index) => (
                <li
                  key={index}
                  onClick={() => handleNotificationClick(notification)}
                  className={notification === selectedNotification ? 'selected' : ''}
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
          {isDialogVisible && labDetails && (
            <div className="lab-details-box">
              <div className="lab-details">
                {selectedNotification.type === 'unread' && (
                  <>
                    <h2>{labDetails.labSessionTitle}</h2>
                    <p>Date: {new Date(labDetails.labDate).toDateString()}</p>
                    <p>Time: {labDetails.labStartTime} - {labDetails.labEndTime}</p>
                    <p>Message: {labDetails.message}</p>
                    <button onClick={handleOkClick} className="ok-button">
                      OK
                    </button>
                  </>
                )}
                {selectedNotification.type === 'request' && (
                  <>
                    <h2>Lab Session Request</h2>
                    <p>From: {labDetails.senderEmail}</p>
                    <p>Lab Session: {labDetails.labSessionTitle}</p>
                    <p>Date: {new Date(labDetails.labDate).toDateString()}</p>
                    <p>Time: {labDetails.labStartTime} - {labDetails.labEndTime}</p>
                    <p>Message: {labDetails.message}</p>
                    <button onClick={handleAcceptClick} className="ok-button">
                      Accept
                    </button>
                  </>
                )}
                {selectedNotification.type === 'cancellation' && (
                  <>
                    <h2>Lab Session Cancellation</h2>
                    <p>From: {labDetails.senderEmail}</p>
                    <p>Lab Session: {labDetails.labSessionTitle}</p>
                    <p>Date: {new Date(labDetails.labDate).toDateString()}</p>
                    <p>Time: {labDetails.labStartTime} - {labDetails.labEndTime}</p>
                    <p>Message: {labDetails.message}</p>
                    <button onClick={handleCancelClick} className="ok-button">
                      OK
                    </button>
                  </>
                )}
                {selectedNotification.type === 'reminder' && (
                  <>
                    <h2>Reminder</h2>
                    <p>{labDetails.labSessionTitle}</p>
                    <p>Date: {new Date(labDetails.labDate).toDateString()}</p>
                    <p>Time: {labDetails.labStartTime} - {labDetails.labEndTime}</p>
                    <p>Remaining Time: {calculateRemainingTime(labDetails.labDate, labDetails.labStartTime)}</p>
                    <button onClick={handleConClick} className="ok-button">
                      OK
                    </button>
                  </>
                )}
                {selectedNotification.type === 'booking_confirmation' && (
                  <>
                    <h2>Booking Confirmation</h2>
                    <p>From: {labDetails.senderEmail}</p>
                    <p>Lab Session: {labDetails.labSessionTitle}</p>
                    <p>Date: {new Date(labDetails.labDate).toDateString()}</p>
                    <p>Time: {labDetails.labStartTime} - {labDetails.labEndTime}</p>
                    <p>Message: {labDetails.message}</p>
                    <button onClick={handleConClick} className="ok-button">
                      OK
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        {isBoxVisible && <Profile />}
      </div>
    </div>
  );
}

function calculateRemainingTime(labDate, labStartTime) {
  const now = new Date();
  const sessionStartTime = new Date(labDate + ' ' + labStartTime);
  const timeDiff = sessionStartTime.getTime() - now.getTime();
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  return minutesDiff;
}
