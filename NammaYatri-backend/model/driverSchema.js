const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driverName: {
        type: String,
        required: true
    },
    driverEmail: {
        type: String,
        required: true
    },
    driverContact: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    drivingLicenseNumber: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    }
}, { timestamps: true })

const DRIVER = mongoose.model('drivers', driverSchema);

module.exports = DRIVER;