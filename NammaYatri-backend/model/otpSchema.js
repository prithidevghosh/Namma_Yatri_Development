const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    customerNumber: {
        type: String,
        required: true
    },
    customerOTP: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    }
}, {
    timestamps: true
})

const OTP = mongoose.model('otp', otpSchema);

module.exports = OTP;