const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const {PORT} = require('./config/config');

const registerLoginHandler = require('./routeHandler/registerLoginHandler')
const scheduleMailHandler = require('./routeHandler/scheduleMailHandler')
const sendMailHandler = require('./routeHandler/sendMailHandler')

require('./config/db')();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api/',registerLoginHandler);
app.use('/api/schedule/mail/',scheduleMailHandler);
app.use('/api/send/mail/',sendMailHandler)

server.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`);
});
