const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const User = require('../models/user');

// Authenticate user
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ user: req.user }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
