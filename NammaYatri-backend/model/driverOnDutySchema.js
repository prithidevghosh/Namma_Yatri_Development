const mongoose = require("mongoose");

const driverOnDutySchema = new mongoose.Schema({
    driverName: {
        type: String,
        required: true
    },
    driverContact: {
        type: Number,
        required: true,

    },
    carNumber: {
        type: String,
        required: true
    },
    driverLatitude: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    driverLongitude: {
        type: mongoose.Types.Decimal128,
        required: true
    }
}, {
    timestamps: true
})

const DRIVER_ON_DUTY = mongoose.model('driverOnDuty', driverOnDutySchema);

module.exports = DRIVER_ON_DUTY;