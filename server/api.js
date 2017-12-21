const express = require('express');
const credentials = require('./credentials.js');
const router = express.Router();
const path = require('path');

//var app = express();

var fs = require('fs');
var io = require("./socket-api.js");

const containerName = "mycontainer";

//mongo
var mongodb = require('mongodb');
const uri = credentials.MLABS_URI;

// Get doc
require('./routes/doc-api')(router,mongodb,uri);

// // Get AutoBot by Url
require('./routes/autobot-api')(router,mongodb,uri);

//upload docs
require('./routes/upload-api')(router,mongodb,uri);

//bot
require('./routes/bot-api')(router,mongodb,uri);

//nodemailer email
require('./routes/nodemailer-api.js')(router,mongodb,uri);

//create request
require('./routes/request-api')(router,mongodb,uri);

module.exports = router;
