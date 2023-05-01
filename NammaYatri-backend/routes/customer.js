const express = require('express');
const ROUTER = express.Router();
const customerController = require('../controller/customer')
const passport = require('passport');


ROUTER.post('/createCustomer_generateOtp', customerController.CREATE_CUSTOMER_GENERATE_OTP);
ROUTER.post('/createCustomer_database', customerController.CREATE_CUSTOMER_DATABASE);
ROUTER.post('/create_session', customerController.CREATE_SESSION);
// ROUTER.get('/get_all_booking/:contact', passport.authenticate('customer-jwt',
//     { failureRedirect: '/', failureMessage: "Authorization failure" })
//     , customerController.GET_ALL_BOOKING);
ROUTER.get('/get_all_booking', customerController.GET_ALL_BOOKING);
ROUTER.post('/create_booking', customerController.CREATE_BOOKING)
module.exports = ROUTER;