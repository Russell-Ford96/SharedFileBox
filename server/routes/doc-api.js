

module.exports = function(router,mongodb,uri){

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
}
