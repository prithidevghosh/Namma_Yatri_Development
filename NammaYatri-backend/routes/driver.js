const express = require('express');
const ROUTER = express.Router();
const driverController = require('../controller/driver')
const passport = require('passport');


ROUTER.post('/createDriver_generateOtp', driverController.CREATE_DRIVER_GENERATE_OTP);
ROUTER.post('/createDriver_database', driverController.CREATE_DRIVER_DATABASE);
ROUTER.post('/create_session', driverController.CREATE_SESSION);
ROUTER.post('/create_on_duty_session', driverController.CREATE_ON_DUTY_SESSION);
ROUTER.delete('/delete_on_duty_session', driverController.DELETE_ON_DUTY_SESSION);
ROUTER.get('/get_all_booking/:contact', passport.authenticate('driver-jwt',
    { failureRedirect: '/', failureMessage: "Authorization failure" })
    , driverController.GET_ALL_BOOKING);


module.exports = ROUTER;