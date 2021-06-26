const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const {PORT} = require('./config/config');

const registerRouter = require('./routes/registerRouter')
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api/user/',registerRouter);

server.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`);
});

// we want the api to have login/signup and google signin
// GET at / -> u need to login/register
// POST at /register -> take username and password and store them (hashed password)
// POST at /login -> take username and password and check them and give a respones
// /history -> all
// /history:id -> 
// /