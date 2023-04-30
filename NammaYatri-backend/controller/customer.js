const twilio = require('twilio');
const otpGenerator = require('otp-generator');
const CUSTOMER = require('../model/customerSchema');
const OTP = require('../model/otpSchema')
const BOOKINGS = require('../model/bookingSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DRIVER_ON_DUTY = require('../model/driverOnDutySchema');
const geolib = require('geolib');
const dotenv = require('dotenv').config();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);

//function to generate the otp 
module.exports.CREATE_CUSTOMER_GENERATE_OTP = async (req, res) => {
    try {
        const customerFetchedDb = await CUSTOMER.findOne({ customerContact: req.body.contact });
        if (customerFetchedDb) {
            return res.status(400).json({
                message: "User already registered ,kindly login to proceed"
            })
        }
        const generatedOtp = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })
        const otp = new OTP({ customerNumber: req.body.contact, customerOTP: generatedOtp });
        const salt = await bcrypt.genSalt(10);
        otp.customerOTP = await bcrypt.hash(otp.customerOTP, salt);
        const result = await otp.save();
        const accountSid = "ACf9c34d5652877b224c895fae85fada12";

        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

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

    } catch (error) {
        return res.status(500).json({
            message: `error trapped in catch block , error is ${error}`
        })
    }
};

//function to validate otp and save user to db
module.exports.CREATE_CUSTOMER_DATABASE = async (req, res) => {
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

            const newUser = new CUSTOMER({
                customerName: req.body.name,
                customerEmail: req.body.email,
                customerContact: req.body.contact,
                password: req.body.password
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
        const customerFetchedDb = await CUSTOMER.findOne({ customerContact: req.body.contact });
        if (!customerFetchedDb) {
            return res.status(400).json({
                message: "you are not registered yet, register yourself first"
            })
        }
        else {

            if (req.body.password == customerFetchedDb.password) {
                let logtoken = jwt.sign(customerFetchedDb.toJSON(), process.env.JWT_ENCRYPTION_KEY, { expiresIn: '1000000' });
                // console.log(logtoken);
                const decoded = jwt.verify(logtoken, process.env.JWT_ENCRYPTION_KEY);
                const userId = decoded._id;
                console.log(userId);
                return res.status(200).json({
                    message: "customer signed in successfully",
                    token: logtoken
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

module.exports.CREATE_BOOKING = async (req, res) => {
    try {
        const driverOnDutyFetchedDb = await DRIVER_ON_DUTY.find({});
        if (driverOnDutyFetchedDb.length == 0) {
            return res.status(400).json({
                message: "No driver is currently available"
            })
        } else {
            // io.on('connection', (socket) => {
            //     const customerLatitude = req.body.latitude;
            //     const customerLongitude = req.body.longitude;
            //     let driversAvailable = new Map();
            //     driverOnDutyFetchedDb.forEach(driver => {
            //         var currentDistance = geolib.getDistance({ latitude: customerLatitude, longitude: customerLongitude },
            //             { latitude: driver.driverLatitude, longitude: driver.driverLongitude })

            //         if (currentDistance <= 300) {
            //             driversAvailable.set(driver._id, socket);
            //         }

            //     })


            // })
        }
    } catch (error) {

    }
}


module.exports.GET_ALL_BOOKING = async (req, res) => {
    try {
        const bookingFetchedDb = await BOOKINGS.find({ customerContact: req.params.contact });
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