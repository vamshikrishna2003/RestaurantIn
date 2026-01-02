const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password });
        const saved = await newUser.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // (Optional: return JWT token here)
        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;