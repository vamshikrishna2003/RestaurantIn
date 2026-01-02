const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

//const {io, app} = require('')
// const { io , app} = require('../server');
// const { body, validationResult } = require('express-validator');
// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Types;
// const jwt = require('@babel/generator/lib/token-mapping');
// const jwtDecode = require('jwt-decode');
// const User = require('...../models/user');
// const { verifyToken } = require('../middleware/authmiddleware');
// const { isadmin } = require('../middleware/adminmiddlewaree');
// const { isuser} = require{ '../middleware/usermiddleware'};
// const { issstaff} = require('../middleware/staffmiddleware');
// const { iscustomer} = require('../middleware/customermiddleware')



// GET all tables
router.get('/', async(req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH - Update table status (booking/cancellation)
router.patch('/:id', async(req, res) => {
    try {
        const updatedTable = await Table.findByIdAndUpdate(
            req.params.id, { status: req.body.status }, { new: true }
        );

        // Emit update to all connected clients (Socket.IO)
        app.set("io", io);


        res.json(updatedTable);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;