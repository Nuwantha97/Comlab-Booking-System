// server/app.js

const express = require('express');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/users', userRoutes); // Example route setup for user-related endpoints

// Other middleware and routes setup...

module.exports = app;
