var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/Todo.js');
var {User} = require('./models/User.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log(`Started on port 3000`);
});

module.exports = {app};
// // Object instanciation examples
// var newTodo = new Todo({
//   text: "    Test Todo 1"
// });
//
// newTodo.save().then((doc) => {
//   console.log(`Saved Todo: ${JSON.stringify(doc, undefined, 2)}`);
// }, (err) => {
//   console.log('Unable to save todo', err);
// });
//
//
// var newUser = new User({
//   email: "    daniyal.awan@hotmail.com"
// });
//
// newUser.save().then((user) => {
//   console.log(`Saved User: ${JSON.stringify(user, undefined, 2)}`);
// }, (err) => {
//   console.log('Unable to save user to database', err);
// });
