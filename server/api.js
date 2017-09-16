const express = require('express');
const twilioCredentials = require('./credentials.js');
const router = express.Router();

// Twilio Credentials 
const ACCOUNT_SID = twilioCredentials.ACCOUNT_SID;
const AUTH_TOKEN = twilioCredentials.AUTH_TOKEN;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN); 
 

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});
router.post('/createRequest', (req, res) => {
    console.log(req.body);

    //twilio api
    /*
    client.messages.create({ 
        to: "", 
        from: "+12134087854", 
        body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
    }, function(err, message) { 
        console.log(err);
        console.log(message); 
    });
    */

    //store data in mongoDB


    res.send("hello world");
});

module.exports = router;
