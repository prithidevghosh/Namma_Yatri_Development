const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const dotEnv = require('dotenv').config();
const CUSTOMER = require('../model/customerSchema');
const DRIVER = require('../model/driverSchema');

var opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ENCRYPTION_KEY
}

passport.use('customer-jwt', new jwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const customerFethedDb = await CUSTOMER.findById(jwt_payload._id);
        if (customerFethedDb) {
            return done(null, customerFethedDb);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}))

passport.use('driver-jwt', new jwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const driverFethedDb = await DRIVER.findById(jwt_payload._id);
        if (driverFethedDb) {
            return done(null, driverFethedDb);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const customer = await CUSTOMER.findById(id)
        if (customer) {
            return done(null, customer);
        } else {
            const driver = await DRIVER.findById(id);
            if (driver) {
                return done(null, driver);
            }
        }

    } catch (error) {
        return done(error);
    }
})


module.exports = passport;