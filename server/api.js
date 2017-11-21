const express = require('express');
const credentials = require('./credentials.js');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
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

//upload with streams//
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
var streamifier = require('streamifier'); //npm install streamifier



// Twilio Credentials
const ACCOUNT_SID = credentials.ACCOUNT_SID;
const AUTH_TOKEN = credentials.AUTH_TOKEN;

//require the Twilio module and create a REST client
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);


//get image uploaded by file number
router.get('/getimage/:createdBy/:refnumb/:file', function(req, res) {
  var fileName = req.params.refnumb + '/' + req.params.file;
  var containerName = req.params.createdBy;
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

/*

router.get('/getimage/:createdBy/:refnumb/:file', function(req, res) {

  var blobName = req.params.refnumb +'/'+ req.params.file;
  var containerName= req.params.createdBy;
  blobSvc.getBlobToStream(
    containerName,
    blobName,
    res,
    function(err, blob) {
      if (!err) {
        res.writeHead(200,{'Content-Type': 'image/png'});
        console.error("Couldn't download blob %s", blobName);
        console.error(err);

      } else {
        console.log("Sucessfully downloaded blob %s", blobName);
        res.end();

      }
    });
});
*/


router.get('/getdoc/:id', (req, res) => {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error connecting to db");
    }

    //create a new mongo ID using the supplied ID
    var o_id = new mongodb.ObjectID(req.params.id);

    var docRequestCollection = db.collection('docRequest');
    docRequestCollection.findOne({
      _id: o_id
    }, function(err, result) {
      if (err) {
        console.log(err);
      }
      db.close();
      if (result != undefined)
        return res.send(result);
      else
        return res.status(404).send("request not found");
    });
  });
});


//upload docs
router.post('/upload', function(req, res, next) {

  upload(req, res, function(err) {
    if (err) {
      // An error occurred when uploading
      console.log("error" + err);
      return res.status(422).send("an Error occured")
    }

    var stream = streamifier.createReadStream(req.file.buffer)
    const fullAzurePath = req.body._refnumb + '/' + req.file.filename;
    var containerName = req.body.createdBy;

    console.log('stream----->', stream)

    blobSvc.createContainerIfNotExists(containerName, function(error, result, response) {
      if (!error) {
        blobSvc.createBlockBlobFromLocalFile(containerName, fileName, path, function(error, result, response) {
          if (!error) {
            // file uploaded
          } else {
            //return res.status(500).send("An error occured");
          }
        });
      } else {
        //return res.status(500).send("An error has occured.");
      }
    });

    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err) {
        console.log(err);
      }
      //create a new mongo ID using the supplied ID ??
      var o_id = new mongodb.ObjectID(req.body._id);
      var index = req.body.index;
      var today = new Date();

      var existingRecord = db.collection('docRequest').findOne({
        _id: o_id
      }, function(err, result) {
        if (err) console.log(err);

        if (result == null) {
          return res.status(422).send("an error occured");
        }
        result.docArray[index].attachment = fullAzurePath;
        result.docArray[index].fileName = req.file.filename;
        result.docArray[index].docName = req.body._namedoc;
        result.docArray[index].dateTime = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() +
          ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        db.collection("docRequest").updateOne({
          _id: o_id
        }, result, function(err, res) {
          if (err) console.log(err);
          console.log("1 document updated");
          db.close();
        });
        db.close();
      });

      return res.send(fullAzurePath);
    });



    console.log('stream uploaded successfully');
    req.model.data = response;
    next();
  });
});



//instead using '/reqdata/:createdBy'
router.get('/getreq/:createdBy', function(req, res) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      throw err;
    }
    var docRequestCollection = db.collection('docRequest');

    docRequestCollection.find({
      createdBy: req.params.createdBy
    }, {
      "limit": 8,
      "skip": 8 * req.params.pageID
    }).toArray(function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the docrequests.");
      }
      //console.log(results);
      return res.status(200).send(results);

    });
  });
});


router.get('/reqdata/:createdBy', function(req, res) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      throw err;
    }
    var docRequestCollection = db.collection('docRequest');
    docRequestCollection.find({
      createdBy: req.params.createdBy
    }).toArray(function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the docrequests.");
      }
      //console.log(results);
      return res.status(200).send(results);
    });

  });
});

//get data for inbox
router.get('/getinbox/:createdBy', function(req, res) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      throw err;
    }
    var docRequestCollection = db.collection('docRequest');
    docRequestCollection.find({
      createdBy: req.params.createdBy,
      "docArray.attachment": {
        $exists: true
      }
    }).sort({
      "docArray.dateTime": 1
    }).toArray(function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the docrequests.");
      }
      //console.log(results);
      return res.status(200).send(results);
    });

  });

});






//detailed request detail by reference number
router.get('/request/detail/:refNumb', function(req, res) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      throw err;
    }
    var docRequestCollection = db.collection('docRequest');
    docRequestCollection.findOne({
      refnumb: req.params.refNumb
    }, function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the request.");
      }
      //console.log(results);
      return res.status(200).send(results);
    });
  });
});


router.get('/bots', function(req, res) {
  console.log("++++++++++++++++++ bots +++++++++++++++++++++++");
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      throw err;
    }
    var botCollection = db.collection('bot');
    botCollection.find().toArray(function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding all bot.");
      }
      //console.log(results);
      return res.status(200).send(results);
    });
  });
});


router.post('/createbot', (req, res) => {
  reqName = req.body.name;
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      console.log(err);
    }
    var reqBots = db.collection('bot');

    var existingName = reqBots.findOne({
        name: reqName
      },
      function(err, result) {
        if (err) {
          console.log(err);
        }
        if (result != null) {
          if (result.name != null) {
            return res.send("Invalid Name.");
          }
        } else {
          reqBots.insert({
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            itemArray: req.body.itemArray,
            createdBy: req.body.createdBy,
            thanks: req.body.thanks,
            active: req.body.active
          }, function(err, result) {
            if (err)
              return res.send("An error has occured");
            else {
              var id = result.insertedIds[0];
              return res.send(id);
            }
          })
          db.close();
        }
      });
  })
})

router.post('/updatebot', (req, res) => {
  console.log("********************* API Update Bot **********************");
  console.log(req.body);
  var o_id = new mongodb.ObjectID(req.body._id);
  var reqName = req.body.name;
  var reqDescription = req.body.description;
  var reqUrl = req.body.url;
  var reqItemArray = req.body.itemArray;
  var reqCreatedBy = req.body.createdBy;
  var reqThanks = req.body.thanks;
  var reqActive = req.body.active;

  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      console.log(err);
    }
    var reqBots = db.collection('bot');

    var existingName = reqBots.update({
      _id: o_id
    }, {
      $set: {
        name: reqName,
        url: reqUrl,
        description: reqDescription,
        itemArray: reqItemArray,
        createdBy: reqCreatedBy,
        thanks: reqThanks,
        active: reqActive
      }
    }, function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem finding the docrequests.");
      }
      //console.log(results);
      return res.status(200).send(results);
    });
  })
})

//nodemailer email
router.post('/email', (req, res) => {

  var toEmail = req.body.toemail;
  var fromEmail = "chatbot.analytics@gmail.com";
  var reqReferenceNum = req.body.refnumb;
  var subject = req.body.subject;
  var body = req.body.body;


  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error connecting to db");
    }

    var docRequestCollection = db.collection('docRequest');
    docRequestCollection.findOne({
      refnumb: reqReferenceNum
    }, function(err, result) {
      if (err) {
        console.log(err);
      }

      if (result != undefined) {
        var urlID = result._id;
        console.log("result is " + result._id);

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: credentials.MAIL_USER,
            pass: credentials.MAIL_PASS
          }
        });

        const mailOptions = {
          from: fromEmail, // sender address
          to: toEmail, // list of receivers
          subject: subject, // Subject line
          //html: '<p>Hello</p>',// plain text body
          text: body + "\n" + "http://localhost:5000/upload/" + urlID
        };

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
            // return res.send(info);

          }
        });
        //return res.send(result);
      } else {
        return res.status(404).send("request not found");
      }
    });
    db.close();
  });

});




//create request
router.post('/create', (req, res) => {
  // var toNumber = req.body.phone;
  // var ourNumber = "+12016883122";
  // var shortMessage = req.body.shortmessage;
  // var detailedMessage = req.body.detailedmessage;
  // var success = true;
  // var reqReferenceNum = req.body.refnumb;
  var toNumber = req.body.phone;
  //var ourNumber = "+12016883122";
  var ourNumber = "+12134087854";
  var detailedMessage = req.body.detailedmessage;
  var reqReferenceNum = req.body.refnumb;
  var today= new Date();
  var datetime= today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
    +' '+today.getHours()+":" +today.getMinutes() + ":" + today.getSeconds();
  req.body.datetime= datetime;


  //validate refnumb
  var isnum = /[0-9]/;
  var isletter = /[a-zA-Z]/;
  var validref = isnum.test(reqReferenceNum) && isletter.test(reqReferenceNum)
  if (!validref || reqReferenceNum.length < 7) {
    return res.send("Invalid reference number")
  }
  //validate email
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!(re.test(req.body.email))) {
    return res.send("Invalid email")
  }

  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) {
      console.log(err);
    }
    var reqDocs = db.collection('docRequest');

    var existingRef = reqDocs.findOne({
      refnumb: reqReferenceNum
    }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        reqDocs.insert(req.body, function(err, result) {
          if (err)
            return res.send("An error has occured");
          else {
            var id = result.insertedIds[0];
            client.messages.create({
              to: toNumber,
              from: ourNumber,
              body: detailedMessage
            }, function(err, message) {
              if (err) {
                console.log(err)
              }
            });
            client.messages.create({
              to: toNumber,
              from: ourNumber,
              body: "https://sharedfilebox.azurewebsites.net/upload/" + id
            }, function(err, message) {
              if (err) {
                console.log(err);
                if (err.code == 21211) {
                  res.send(err.message)
                }
              } else if (err == null) {
                res.send(id)
              }
              console.log('*****message', message)
            });
          }
        })
        db.close();
      }
    });

  })
})

module.exports = router;
