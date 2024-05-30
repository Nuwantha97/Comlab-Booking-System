const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRouter'); 


app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 

module.exports = app;
