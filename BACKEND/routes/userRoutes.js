// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Add a new user
router.post('/add', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied. You're not an admin." });
    }
    const { firstName, lastName, email, role, password } = req.body;
    const user = new User({ firstName, lastName, email, role, password });
    await user.save();
    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
