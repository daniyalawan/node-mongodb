const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('We are unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var db = client.db('TodoApp');

  // //deleteMany
  // db.collection('Todos').deleteMany({text: "Something todo"}).then((result) => {
  //   console.log(result);
  // });
  //
  // //deleteOne
  // db.collection('Todos').deleteOne({text: "Something todo 2"}).then((result) => {
  //   console.log(result);
  // });
  //
  // //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({isCompleted: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: "Test User"}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5b81d721f3543a3ad0ef308a")
  }).then((result) => {
    console.log(result);
  })

  //client.close();
});
