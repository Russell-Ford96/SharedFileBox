const express = require('express');
const credentials = require('./credentials.js');
const router = express.Router();
const path = require('path');
var fs = require('fs');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;


var azure = require('azure-storage');
var blobSvc = azure.createBlobService();
const containerName = "mycontainer";

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


router.get('/download/:file', function(req, res) {
    var fileName = req.params.file;
    blobSvc.getBlobProperties(
        containerName,
        fileName,
        function(err, properties, status) {
            if (err) {
                console.log(err.message);
                res.send(502, "Error fetching file: %s", err.message);
            } else if (!status.isSuccessful) {
                res.send(404, "The file %s does not exist", fileName);
            } else {
                res.header('Content-Type', properties.contentType);
                blobSvc.createReadStream(containerName, fileName).pipe(res);
            }
        });
});

router.get('/getdoc/:id', (req, res) => {
        mongodb.MongoClient.connect(uri, function(err, db) {
            if(err){
                console.log(err);
                return res.status(500).send("Error connecting to db");
            }

            //create a new mongo ID using the supplied ID
            var o_id = new mongodb.ObjectID(req.params.id);

            var docRequestCollection = db.collection('docRequest');
            docRequestCollection.findOne({ _id: o_id }, function(err, result) {
                if (err) {
                 console.log(err);
                }
                db.close();
                if(result != undefined)
                    return res.send(result);
                else
                    return res.status(404).send("request not found");
            });
        });
});



router.post('/upload', function (req, res, next) {

    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }

    let path = req.file.path;
    let fileName = req.body._refnumb + '/' + req.file.filename;
    var containerName = req.body.createdBy;


    blobSvc.createContainerIfNotExists(containerName, function(error, result, response){
        if(!error){
          blobSvc.createBlockBlobFromLocalFile(containerName, fileName, path, function(error, result, response){
            if(!error){
              // file uploaded
            } else {
                return res.status(500).send("An error occured");
            }
          });
        } else {
            return res.status(500).send("An error has occured.");
        }
    });

    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err){
            console.log(err);
        }

        //create a new mongo ID using the supplied ID
        var o_id = new mongodb.ObjectID(req.body._id);
        var index = req.body.index;
        var fileName = path;

        var existingRecord = db.collection('docRequest').findOne({ _id: o_id }, function(err, result) {
            if (err) console.log(err);

            if(result == null) {
                res.status(422).send("an error occured");
            }

            result.docArray[index].attachment = fileName;
            result.docArray[index].fileName = req.file.filename;
            result.docArray[index].docName = req.body._namedoc;
            db.collection("docRequest").updateOne({ _id: o_id }, result, function(err, res) {
                if (err) console.log(err);
                console.log("1 document updated");
                db.close();
            });
            db.close();
        });
    });

    return res.send(path);
  });
})



router.get('/getreq/:pageID/:createdBy',function (req,res) {
  mongodb.MongoClient.connect(uri, function (err, db) {
    if (err) {
      throw err;
    }
    var docRequestCollection = db.collection('docRequest');

    docRequestCollection.find({ createdBy: req.params.createdBy },{ "limit": 8, "skip": 8 * req.params.pageID  }).toArray( function (err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the docrequests.");
      }
      //console.log(results);
      return res.status(200).send(results);
    });
  });
});


router.get('/maxpage/:createdBy',function(req,res) {
  mongodb.MongoClient.connect(uri, function (err, db) {
    if (err) {
      throw err;
    }
    var docRequestCollection = db.collection('docRequest');


    docRequestCollection.find({ createdBy: req.params.createdBy },{}).toArray( function (err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the docrequests.");
      }
        let maxPage = Math.floor(results.length/8).toString();
        return res.status(200).send(maxPage);
    });


  });
});



router.post('/create', (req, res) => {
    var toNumber = req.body.phone;
    var ourNumber = "+12016883122";
    var shortMessage = req.body.shortmessage;
    var detailedMessage = req.body.detailedmessage;
    var success = true;
    var reqReferenceNum = req.body.refnum;

    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err){
            console.log(err);
        }
        var reqDocs = db.collection('docRequest');
        var existingRef = reqDocs.findOne({ refnum: reqReferenceNum }, function(err, result) {
            if (err){
                console.log(err);
            }
            if(result.refnum != null) {
                return res.send("Invalid Reference Number.");
            }
            else{
              reqDocs.insert(req.body, function(err, result) {
                  if(err)
                      res.send("An error has occured");
                      else {
                          var id = result.insertedIds[0];
                          client.messages.create({
                              to: toNumber,
                              from: ourNumber,
                              body: detailedMessage
                          }, function(err, message) {
                                if(err){
                                    return res.send(err)
                                }
                          });
                          client.messages.create({
                              to: toNumber,
                              from: ourNumber,
                              body: "https://sharedfilebox.azurewebsites.net/upload/" + id
                          }, function(err, message) {
                              if(err) {
                                  return res.send(err)
                              }
                              console.log(message);
                          });
                          res.send(id);
                      }
              })

              db.close();
            }
        });
    })
})

module.exports = router;
