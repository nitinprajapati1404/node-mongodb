// Import required modules
const express = require('express');
global.router = express.Router();
const bodyParser = require('body-parser')

// Create an Express application
global.app = express();

// ENV VARIABLE SETUP START

const dotenv = require('dotenv');
var envFileName = process.env.NODE_ENV || 'local'
dotenv.config({ path: 'config/env/.env.' + envFileName })

//REQUIRE CONFIGURATION
require('./config/config')

const port = process.env.PORT || 3000;

//ALLOW Req & Res As of now allowed * but in product in need to mange those from enviorement and alllowed limited host
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const responseOk = require(`./policies/ok`);
app.use(responseOk('on'));

// Define a sample route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});

app.use('/api/v1', require('./routes/index'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
