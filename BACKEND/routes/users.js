const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/add', async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. You're not an admin." });
    }
    
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    await user.save();

    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
