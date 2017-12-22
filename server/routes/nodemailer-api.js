
const nodemailer = require('nodemailer');

module.exports = function(router,mongodb,uri){

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
}
