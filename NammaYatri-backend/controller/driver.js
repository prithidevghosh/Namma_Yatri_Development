const DRIVER_INFO = require('../model/driverInfo');
const DRIVER = require('../model/driverSchema');
const DRIVER_ON_DUTY = require('../model/driverOnDutySchema');
const PAST_BOOKINGS = require('../model/pastBookingSchema')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const OTP = require('../model/otpSchema');
const twilio = require('twilio')
const dotEnv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const BOOKINGS = require('../model/bookingSchema');
// const geoLocation = require('node-geolocation')

module.exports.CREATE_DRIVER_GENERATE_OTP = async (req, res) => {
    try {
        const driverInfoFetchedDb = await DRIVER_INFO.findOne({ licenseNumber: req.body.license, carNumber: req.body.carNumber });
        if (driverInfoFetchedDb) {
            const driverFetchedDb = await DRIVER.findOne({ driverContact: req.body.contact });
            if (driverFetchedDb) {
                return res.status(400).json({
                    message: "Driver already registered"
                })
            } else {
                if (req.body.password == req.body.confirmPassword) {
                    const generatedOtp = otpGenerator.generate(6, {
                        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
                    })

                    const otp = new OTP({ customerNumber: req.body.contact, customerOTP: generatedOtp });
                    const salt = await bcrypt.genSalt(10);
                    otp.customerOTP = await bcrypt.hash(otp.customerOTP, salt);
                    const result = await otp.save();
                    const accountSid = process.env.TWILIO_ACCOUNT_SID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    const client = twilio(accountSid, authToken);
                    // console.log(generatedOtp);
                    client.messages
                        .create({ body: `Hi, your otp from Namma Yatri backend server is ${generatedOtp}`, from: '+16073899013', to: req.body.contact })
                        .then(message => {
                            console.log(message.sid);
                            res.status(200).json({ message: 'OTP sent successfully' });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({ message: 'Error sending OTP' });
                        });
                }

            }

        } else {
            return res.status(400).json({
                message: "Drivers cannot get registered without valid driving license / valid number plate"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `error caught in catch block in driver generate otp func, the error is ${error}`
        })
    }

}
module.exports.CREATE_DRIVER_DATABASE = async (req, res) => {
    try {
        // console.log(req.body.otp);
        const otpFetchedDb = await OTP.find({});
        // console.log(otpFetchedDb);
        if (otpFetchedDb.length == 0) { return res.status(400).json({ message: "otp expired" }) }
        const latestOtp = otpFetchedDb[otpFetchedDb.length - 1];
        console.log(latestOtp.customerOTP);
        console.log(req.body.otp);
        //may add a callback in compare func to handle password mismatch
        const validateUser = await bcrypt.compare(req.body.otp, latestOtp.customerOTP);
        if (validateUser) {

            const newUser = new DRIVER({
                driverName: req.body.name,
                driverEmail: req.body.email,
                driverContact: req.body.contact,
                password: req.body.password,
                drivingLicenseNumber: req.body.license,
                carNumber: req.body.carNumber
            })

            const result = await newUser.save();
            return res.status(200).json({
                message: newUser
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `error trapped in catch block while saving user to db, error is ${error}`
        })
    }
}
module.exports.CREATE_SESSION = async (req, res) => {
    try {
        const driverFetchedDb = await DRIVER.findOne({ driverContact: req.body.contact });
        if (!driverFetchedDb) {
            return res.status(400).json({
                message: "you are not registered yet, register yourself first"
            })
        }
        else {
            if (req.body.password == driverFetchedDb.password) {
                return res.status(200).json({
                    message: "driver signed in successfully",
                    token: jwt.sign(driverFetchedDb.toJSON(), process.env.JWT_ENCRYPTION_KEY, { expiresIn: '1000000' })
                })
            } else {
                return res.status(400).json({
                    message: "password incorrect"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `error generated in catch block while creating session , error is ${error}`
        })
    }
}

module.exports.CREATE_ON_DUTY_SESSION = async (req, res) => {

    try {
        const driverFetchedDb = await DRIVER.findOne({ driverContact: req.body.contact });
        if (driverFetchedDb) {


            const onDutyFetchedDb = await DRIVER_ON_DUTY.findOne({ driverContact: req.body.contact });
            if (onDutyFetchedDb) {
                return res.status(400).json({
                    message: "you are already registered as ON DUTY"
                })
            } else {
                const newOnDutyDriver = new DRIVER_ON_DUTY({
                    driverName: req.body.name,
                    driverContact: req.body.contact,
                    carNumber: driverFetchedDb.carNumber,
                    driverLatitude: req.body.latitude,
                    driverLongitude: req.body.longitude
                })

                const result = await newOnDutyDriver.save();
                return res.status(200).json({
                    message: newOnDutyDriver
                })
            }


        } else {
            return res.status(400).json({
                message: "Please register yourself first as a driver"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `error trapped in catch block while creating on duty session, error is ${error}`
        })
    }
}

module.exports.DELETE_ON_DUTY_SESSION = async (req, res) => {
    try {
        const onDutyFetchedDb = await DRIVER_ON_DUTY.findOneAndDelete({ driverContact: req.body.contact });
        return res.status(200).json({
            message: "session deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            messgae: `error caught in catch block while deleting on duty session , error is ${error}`
        })
    }
}

module.exports.GET_ALL_BOOKING = async (req, res) => {
    try {
        const bookingFetchedDb = await BOOKINGS.find({ driverContact: req.params.contact });
        if (bookingFetchedDb.length > 0) {
            return res.status(200).json({
                message: "Booking found",
                bookings: bookingFetchedDb
            })
        } else {
            return res.status(400).json({
                message: "No bookings made so far"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "error caught in catch block of get booking"
        })
    }
}

module.exports.CANCEL_BOOKING = async (req, res) => {
    try {
        const bookingFetchedDb = await BOOKINGS.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Booking cancelled"
        })

    } catch (error) {
        return res.status(500).json({
            message: `error caught in catch block of cancel booking and error is ${error}`
        })
    }
}

module.exports.COMPLETE_TRIP = async (req, res) => {
    try {
        const bookingFetchedDb = await BOOKINGS.findById(req.params.id);
        const newCompletedBooking = new PAST_BOOKINGS({
            customerContact: bookingFetchedDb.customerContact,
            driverName: bookingFetchedDb.driverName,
            driverContact: bookingFetchedDb.driverContact,
            carNumber: bookingFetchedDb.carNumber,
            bookingStatus: "completed"
        })
        newCompletedBooking.save();
        const result = await bookingFetchedDb.deleteOne();
    } catch (error) {

    }
}


