const mongodb = require('mongodb');
const RxMongodb = require('rx-mongodb');
const rxMongodb = new RxMongodb(mongodb);
const Rx = require('rxjs');

const fs = require('fs')

const grid = require('gridfs-stream');

const im = require('imagemagick');

const ObjectId = require('mongodb').ObjectID;

const gm = require('gm').subClass({
  imageMagick: true
});

var MongoClient = mongodb.MongoClient;

const dbName = "workchew";

const mongoIP = process.env.MONGO_IP || 'localhost'

const connectionString = 'mongodb://' + mongoIP + ':27017/' + dbName;

var post = function(collectionName, dataDocument) {
  console.log("")
  console.log('@ mongo insert', {
    collectionName,
    dataDocument
  })

  return rxMongodb

    .connect(connectionString)

    .flatMap(db => rxMongodb

      .insert(collectionName, dataDocument)

  )
    .map(mongoInsertResponse => {

      console.log('@mongo insert response', mongoInsertResponse)
      console.log("")

      return mongoInsertResponse.ops[0]
    })

}


var update = function(collectionName, dataDocument, witch) {
  console.log("")
  console.log('@ mongo update', {
    collectionName,
    dataDocument
  })

  return rxMongodb

    .connect(connectionString)

    .flatMap(db => rxMongodb

      .update(collectionName, witch, dataDocument)

  )
    .map(mongoInsertResponse => {

      console.log('@mongo insert response', mongoInsertResponse)
      console.log("")

      return mongoInsertResponse.ops[0]
    })

}


var get = function(collectionName, query) {

  if (query._id) {

    query._id = new ObjectId(query._id)

  }
  console.log("")
  console.log('@ mongo get', {
    collectionName,
    query
  })

  return rxMongodb

    .connect(connectionString)

    .switchMap(db => rxMongodb

      .find(collectionName, query)

  )

    .map(mongoGetResponse => {

      console.log('@mongo get response', mongoGetResponse)
      console.log("")
      return mongoGetResponse
    })

}

var storeImage = function({file, metadata} , db) {

  return Rx.Observable.create(function(observer) {

    var gfs = grid(db, mongodb);

    var writestream = gfs.createWriteStream({
      filename: file.name,
      metadata: metadata
    });

    gm(file.path)
      .resize(600, 800, '!')
      .write(file.path, function(err) {

        fs.createReadStream(file.path).pipe(writestream);

        if (err) console.log(err);
      }); // image resizing

    writestream.on('close', function(newfile) {

      console.log('newfile', newfile)

      //redirect
      fs.unlink(file.path, function(err) {
        if (err) {
          return console.error(err);
        }
        console.log("File deleted successfully!");

        observer.next({
          id: newfile._id.valueOf() + "",
          metadata: newfile.metadata
        });

        observer.complete();
      });

    }); // writestream on close

  }); //Create obser

}

var postImage = function({file, metadata}) {

  return getMognoClient()

    .switchMap((db) => {

      return storeImage({
        file,
        metadata
      }, db)

    })

} //postImage

var getMognoClient = function() {

  return Rx.Observable.create(function(observer) {

    MongoClient.connect(connectionString, function(err, db) {

      observer.next(db);

      observer.complete();

    })

  });

}

var retrieveImage = function({_id}) {

  return getMognoClient()

    .map((db) => {

      var gfs = grid(db, mongodb);

      return gfs

        .createReadStream({
          _id
        })

    })

}

var dbService = {

  get,

  post,

  postImage,

  retrieveImage,

  getMognoClient
}

module.exports = dbService



