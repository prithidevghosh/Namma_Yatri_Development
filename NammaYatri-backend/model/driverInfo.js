const mongoose = require('mongoose');

const driverInfoSchema = new mongoose.Schema({
    licenseNumber: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const DRIVER_INFO = mongoose.model('driverInfo', driverInfoSchema);

module.exports = DRIVER_INFO;