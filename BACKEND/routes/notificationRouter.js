const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');
const { setTimeout } = require('timers/promises');
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
                    IsLabWillGoingOn: false,
                    isRead: false,
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


module.exports = router;