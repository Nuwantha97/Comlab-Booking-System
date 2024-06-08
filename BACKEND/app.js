const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRouter'); 
const bookingRoutes = require('./routes/bookingRoutes');

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/bookings', bookingRoutes);
module.exports = app;
