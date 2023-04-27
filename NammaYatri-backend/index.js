const express = require('express');
const port = process.env.PORT || 8000;
const DB = require('./config/dataBaseConfig');
const dotEnv = require('dotenv').config();
const app = express();


app.use(express.urlencoded());
app.use(express.json())

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
