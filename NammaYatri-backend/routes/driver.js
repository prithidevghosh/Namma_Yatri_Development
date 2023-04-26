const express = require('express');
const ROUTER = express.Router();
const driverController = require('../controller/driver')


ROUTER.post('/createDriver_generateOtp', driverController.CREATE_DRIVER_GENERATE_OTP);
ROUTER.post('/createDriver_database', driverController.CREATE_DRIVER_DATABASE);
ROUTER.post('/create_session', driverController.CREATE_SESSION);
ROUTER.post('/create_on_duty_session', driverController.CREATE_ON_DUTY_SESSION);
ROUTER.delete('/delete_on_duty_session', driverController.DELETE_ON_DUTY_SESSION);

module.exports = ROUTER;