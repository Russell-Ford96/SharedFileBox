// Get AutoBot by Url

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

 router.post('/createBotRequest', (req, res) => {
     console.log(req.body);
     var customerFullName = req.body.customerFullName;
     var botName = req.body.bot.name;
     var botUrl = req.body.bot.url;
     var botId = req.body.bot._id;
     var requests = req.body.requests;
     var answerDate = new Date();

   mongodb.MongoClient.connect(uri, function(err, db) {
     if (err) {
       console.log(err);
     }
     var botRequest = db.collection('botRequest');

           botRequest.insert({
             customerFullName: customerFullName,
             botName: botName,
             botUrl: botUrl,
             botId: botId,
             requests: requests,
             answerDate: answerDate
           }, function(err, result) {
             if (err)
               return res.send("An error has occured");
             else {
               var id = result.insertedIds[0];
               return res.send(id);
             }
           })
           db.close();

       });
   });
}
