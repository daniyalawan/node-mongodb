const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('We are unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var db = client.db('TodoApp');
  db.collection('Todos').insertOne({
    text: 'Something todo',
    isCompleted: false
  }, (err, result) => {
    if(err){
      return console.log('Unable to add todo in DB', err);
    }
    console.log(`Note added successfully: ${JSON.stringify(result.ops, undefined, 2)}`);
  });

  db.collection('Users').insertOne({
    name: 'Daniyal Awan',
    age: 24,
    location: 'Pakistan'
  }, (err, result) => {
    if(err){
      return console.log('Unable to add User in DB', err);
    }
    console.log(`User added successfully: ${JSON.stringify(result.ops, undefined, 2)}`);
  });

  client.close();
});
