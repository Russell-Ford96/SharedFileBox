const express = require('express');
const credentials = require('./credentials.js');
const router = express.Router();
var mongodb = require('mongodb');
var uri = credentials.MLABS_URI;

// Twilio Credentials 
const ACCOUNT_SID = credentials.ACCOUNT_SID;
const AUTH_TOKEN = credentials.AUTH_TOKEN;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN); 


 
router.get('*', (req, res) => {
    console.log("api hit");
    res.send("api hit");
});
/* GET api listing. */
router.post('/upload', (req, res) => {
    console.log(req.body);
    /*
    if(req.params._id == "" || req.body.attachment == "")
        console.log("fail here");
        */

    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err){
            throw err;
        }
        var o_id = new mongodb.ObjectID(req.body._id);
        var existingRecord = db.collection('docRequest').findOne({ _id: o_id }, function(err, result) {
            if (err) throw err;
            result.docArray[0].attachment = "attachment here";
            db.collection("docRequest").updateOne({ _id: o_id }, result, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
            db.close();
        });
    });

    var myquery = { _id: req.body._id };
    //existingRecord.docArray[INDEX_HERE] = FILE HERE; <-- implement
    /*
    */


});
router.post('/create', (req, res) => {
    var toNumber = req.body.phone;
    var ourNumber = "+12134087854";
    var message = req.body.message;
    var success = true;
    console.log(req.body);

    //twilio api
    client.messages.create({ 
        to: toNumber,
        from: ourNumber,
        body: message
    }, function(err, message) { 
        console.log("an error has occured in api/create");
        //console.log(err);
        //console.log(message);
    });

    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err){
            throw err;
        }
        reqDocs.insert(req.body, function(err, result) {
            if(err) throw err;
        });

    });




});

module.exports = router;
