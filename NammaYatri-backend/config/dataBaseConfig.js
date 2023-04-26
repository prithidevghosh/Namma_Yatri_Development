const mongoose = require('mongoose')
const dotEnv = require('dotenv').config();
const mongoURI = process.env.DATABASE_URI;
console.log(mongoURI);
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })

const DB = mongoose.connection;

DB.on('error', () => {
    console.log("error in starting db");
})

DB.on('connected', () => {
    console.log("connected to db");
})

module.exports = DB