const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  description: String,
  status: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Booking', bookingSchema);
