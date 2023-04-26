const express = require('express');
const ROUTER = express.Router();
const customerController = require('../controller/customer')


ROUTER.post('/createCustomer_generateOtp', customerController.CREATE_CUSTOMER_GENERATE_OTP);
ROUTER.post('/createCustomer_database', customerController.CREATE_CUSTOMER_DATABASE);
ROUTER.post('/create_session', customerController.CREATE_SESSION);

module.exports = ROUTER;