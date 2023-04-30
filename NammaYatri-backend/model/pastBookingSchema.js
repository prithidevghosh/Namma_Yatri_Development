const mongoose = require('mongoose');

const pastBookingSchema = new mongoose.Schema({
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
    },
    bookingStatus: {
        type: String
    }
}, {
    timestamps: true
})

const PAST_BOOKINGS = mongoose.model('past-bookings', pastBookingSchema);

module.exports = PAST_BOOKINGS;