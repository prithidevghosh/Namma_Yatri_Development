const express = require('express');
const port = process.env.PORT || 8000;
const DB = require('./config/dataBaseConfig');
const dotEnv = require('dotenv').config();
const app = express();
const passport = require('passport');
const jwtStrategy = require('./config/passport-jwt-strategy');
const session = require('express-session');
const chatServer = require('http').Server(app);
const socket = require('./config/socket').chatSockets(chatServer);
const MongoStore = require('connect-mongo');
const cors = require('cors');

chatServer.listen(process.env.PORT || 3000, () => {
    console.log("socket port up & runnning");
})


app.use(cors());
app.use(express.urlencoded());
app.use(express.json())

app.use(session({
    name: 'backend',
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://prithidevghosh:39039820@cluster0.3amaqwo.mongodb.net/NammaYatri",
        autoRemove: 'disabled'
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Namma Yatri backend api instance"
    })
})
app.use('/api', require('./routes/index'));

app.listen(port, (e) => {
    if (e) { console.log(e); return; }

    console.log(`server started at port ${port}`);
})
