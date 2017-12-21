// Get AutoBot by Url
// const express = require('express');
// const router = express.Router();
module.exports = function(router,mongodb,uri){
  router.get('/getbotbyurl/:url', (req, res) => {
    console.log("api/getBotByUrl");
    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error connecting to db");
      }

      var o_url = req.params.url;

      var docRequestCollection = db.collection('bot');
      docRequestCollection.findOne({
        url: o_url
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
}
