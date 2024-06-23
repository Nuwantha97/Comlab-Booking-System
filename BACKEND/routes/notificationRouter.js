const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');
require('dotenv').config();

// POST route to create notifications
router.post('/createNotification', auth, async (req, res) => {
    try {
        const { title, startTime, endTime, description, attendees, uEmail, uDate} = req.body;

        // Function to create notifications for each attendee
        const createNotifications = async (attendees) => {
            const notifications = [];

            for (let i = 0; i < attendees.length; i++) {
                const receiverEmail = attendees[i];
                console.log('receiverEmail:', receiverEmail);
                const senderEmail = uEmail

                const newNotification = new Notification({
                    receiverEmail,
                    senderEmail,
                    labSessionTitle: title,
                    labDate: uDate,
                    labStartTime: startTime,
                    labEndTime: endTime,
                    message: description,
                    isReceiverConfirm: false,
                    IsLabWillGoingOn: true,
                    isRead: false,
                    type: 'request',
                    
                });
                await newNotification.save();
                notifications.push(newNotification);
            }

            return notifications;
        };

        // Create notifications for each attendee
        const notifications = await createNotifications(attendees);

        res.status(201).json(notifications);
    } catch (error) {
        console.error('Error creating notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch all notifications
router.get('/', auth, async (req, res) => {
    const userEmail = req.user.email; 

    try {
        const notifications = await Notification.find({ receiverEmail: userEmail });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// PUT route to mark notifications as read for a specific user
router.put('/markRead', auth, async (req, res) => {
    const userEmail = req.user.email; 

    try {
        const notification = await Notification.findOneAndUpdate(
            { receiverEmail: userEmail },
            { isRead: true },
            { new: true } // Return updated document
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found for the current user' });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// PUT route to mark notifications as read for the authenticated user
router.put('/markRead/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userEmail = req.user.email; 

    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: id, receiverEmail: userEmail },
            { isRead: true },
            { new: true } // Return updated document
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found for the current user' });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// POST route to update isReceiverConfirm for notifications for the authenticated user
router.post('/updateIsReceiverConfirm/:notificationId', auth, async (req, res) => {
    const { notificationId } = req.params;
    const userEmail = req.user.email; 

    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, receiverEmail: userEmail },
            { isReceiverConfirm: true, type: 'booking_confirmation' },
            { new: true } // Return updated document
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found for the current user' });
        }

        res.status(200).json({ message: 'isReceiverConfirm updated successfully', notification });
    } catch (error) {
        console.error('Error updating isReceiverConfirm:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to update IsLabWillGoingOn and type for notifications for the authenticated user
router.post('/updateIsLabStatus/:notificationId', auth, async (req, res) => {
    const { notificationId } = req.params;
    const userEmail = req.user.email; 

    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, receiverEmail: userEmail },
            { IsLabWillGoingOn: false, type: 'cancellation' },
            { new: true } // Return updated document
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found for the current user' });
        }

        res.status(200).json({ message: 'IsLabWillGoingOn updated to false and type changed to cancellation', notification });
    } catch (error) {
        console.error('Error updating IsLabWillGoingOn and type:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to update type based on labDate proximity for notifications for the authenticated user
router.post('/updateNotificationType/:notificationId', auth, async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        const labDate = moment(notification.labDate);
        const currentDate = moment();

        // Calculate difference in days
        const daysDifference = labDate.diff(currentDate, 'days');

        // Update type to 'reminder' if labDate is 1 day away
        if (daysDifference === 1) {
            notification.type = 'reminder';
            await notification.save();
            return res.status(200).json({ message: 'Notification type updated to reminder', notification });
        } else {
            return res.status(200).json({ message: 'Notification type remains unchanged', notification });
        }
    } catch (error) {
        console.error('Error updating notification type:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;