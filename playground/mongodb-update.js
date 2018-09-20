const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('We are unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //     _id: new ObjectID("5b81d61c2a9ab14e1c45e101")
  //   }, {
  //     $set: {
  //       isCompleted: false
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(JSON.stringify(result, undefined, 2));
  //   });

  db.collection('Users').findOneAndUpdate({
      _id: new ObjectID("5b982551662110620892e31d")
    }, {
      $set: {
        name: "M. Daniyal Awan"
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    });

  //client.close();
});
