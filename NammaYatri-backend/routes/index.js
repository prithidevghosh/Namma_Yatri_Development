const express = require('express');
const ROUTER = express.Router();


ROUTER.use('/customer', require('./customer'));
ROUTER.use('/driver', require('./driver'));

module.exports = ROUTER;