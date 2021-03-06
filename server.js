const express = require('express');
// const http = require('http');

const app = express();
// const server = http.createServer(app);

const cors = require('cors');
app.use(cors())

const {PORT} = require('./config/config');

const registerLoginHandler = require('./routeHandler/registerLoginHandler')
const scheduleMailHandler = require('./routeHandler/scheduleMailHandler')
const sendMailHandler = require('./routeHandler/sendMailHandler')
const recurrMailHandler = require('./routeHandler/recurrMailHandler')

require('./config/db')();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api/',registerLoginHandler);
app.use('/api/schedule/mail/',scheduleMailHandler);
app.use('/api/send/mail/',sendMailHandler)
app.use('/api/recurr/mail/',recurrMailHandler)

app.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`);
});
