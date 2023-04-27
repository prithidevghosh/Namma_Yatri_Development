const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerContact: {
        type: Number,
        required: true,
        unique: true
    },
    driverName: {
        type: String,
        required: true
    },
    driverContact: {
        type: Number,
        required: true,
        unique: true
    },
    carNumber: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})

const BOOKINGS = mongoose.model('bookings', bookingSchema);

module.exports = BOOKINGS;