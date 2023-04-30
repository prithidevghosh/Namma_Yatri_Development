const express = require('express');
const port = process.env.PORT || 8000;
const DB = require('./config/dataBaseConfig');
const dotEnv = require('dotenv').config();
const app = express();
const passport = require('passport');
const jwtStrategy = require('./config/passport-jwt-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const server = app.listen(port, () => {
    console.log(`server started at port ${port}`);
});

const webSocket = require('ws');
const wss = new webSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log("a new client is connected");
    ws.send("hi message from server")
});

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

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
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Namma Yatri backend api instance"
    })
});

app.use('/api', require('./routes/index'));
