const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST - Create reservation
router.post('/', async(req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        const saved = await newReservation.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// GET - Get all reservations
router.get('/', async(req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET - Get reservation by ID
router.get('/:id', async(req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
})

module.exports = router;