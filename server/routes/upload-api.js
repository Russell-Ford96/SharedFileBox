var azure = require('azure-storage');
var blobSvc = azure.createBlobService();
var streamifier = require('streamifier'); //npm install streamifier

//multer
const DIR = './server/uploads/';
var multer = require('multer');

//upload with streams//
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(router,mongodb,uri){
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
}
