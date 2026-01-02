const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    number: Number,
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available'
        
    }
});

module.exports = mongoose.model('Table', tableSchema);