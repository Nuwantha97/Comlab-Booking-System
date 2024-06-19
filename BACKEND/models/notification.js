const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notificationSchema = new mongoose.Schema({
    reciverEmail: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['booking_confirmation', 'request', 'cancellation', 'reminder'],
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    labSessionTitle: {
        type: String,
        required: true
    },
    labDate: {
        type: Date,
        required: true
    },
    labStartTime: {
        type: String,
        required: true
    },
    labEndTime: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isReciverConfirm: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
	IsLabWillGoingOn: {
		type:Boolean,
		default:false
	},
    isRead:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
