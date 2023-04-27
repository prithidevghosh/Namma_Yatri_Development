const express = require('express');
const ROUTER = express.Router();

ROUTER.get('/', (req, res) => { return res.end("hello") })
ROUTER.use('/customer', require('./customer'));
ROUTER.use('/driver', require('./driver'));

module.exports = ROUTER;