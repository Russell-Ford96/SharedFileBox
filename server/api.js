const express = require('express');
const credentials = require('./credentials.js');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');

//mongo
var mongodb = require('mongodb');
const uri = credentials.MLABS_URI;

//multer
const DIR = './server/uploads/';
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(20).toString('hex') + path.extname(file.originalname)) //Appending extension
  }
})
var upload = multer({ storage: storage }).single('single');


// Twilio Credentials 
const ACCOUNT_SID = credentials.ACCOUNT_SID;
const AUTH_TOKEN = credentials.AUTH_TOKEN;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN); 


 

router.get('/getdoc/:id', (req, res) => {
        mongodb.MongoClient.connect(uri, function(err, db) {
            if(err){
                throw err;
            }

            //create a new mongo ID using the supplied ID
            var o_id = new mongodb.ObjectID(req.params.id);

            var docRequestCollection = db.collection('docRequest');
            docRequestCollection.findOne({ _id: o_id }, function(err, result) {
                if (err) throw err;
                db.close();
                console.log("hit");
                if(result != undefined)
                    return res.send(result);
                else
                    return res.status(404).send("request not found");
            });
        });
});

router.post('/upload', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  

       // No error occured.
    path = req.file.filename;
    console.log(req.body);

    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err){
            throw err;
        }

        //create a new mongo ID using the supplied ID
        var o_id = new mongodb.ObjectID(req.body._id);
        var index = req.body.index;
        var fileName = path;

        var existingRecord = db.collection('docRequest').findOne({ _id: o_id }, function(err, result) {
            if (err) throw err;

            if(result == null) {
                res.status(422).send("an error occured");
            }

            result.docArray[index].attachment = fileName;
            db.collection("docRequest").updateOne({ _id: o_id }, result, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
            db.close();
        });
    });

    return res.send(path);
  });     
})

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
        var reqDocs = db.collection('docRequest');
        reqDocs.insert(req.body, function(err, result) {
            if(err) throw err;
        });

    });
});

module.exports = router;
