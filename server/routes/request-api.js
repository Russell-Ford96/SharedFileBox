const credentials = require('../credentials.js');
// Twilio Credentials
const ACCOUNT_SID = credentials.ACCOUNT_SID;
const AUTH_TOKEN = credentials.AUTH_TOKEN;

//require the Twilio module and create a REST client
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

module.exports = function(router,mongodb,uri){

  router.post('/create', (req, res) => {
    // var toNumber = req.body.phone;
    // var ourNumber = "+12016883122";
    // var shortMessage = req.body.shortmessage;
    // var detailedMessage = req.body.detailedmessage;
    // var success = true;
    // var reqReferenceNum = req.body.refnumb;
    var toNumber = req.body.phone;
    var ourNumber = "+12016883122";
    // var ourNumber = "+12134087854";
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

}
