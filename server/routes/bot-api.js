
module.exports = function(router,mongodb,uri){

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
              avatar: req.body.avatar,
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
    var reqAvatar = req.body.avatar;
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
          avatar: reqAvatar,
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
}
