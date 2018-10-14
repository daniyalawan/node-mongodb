const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'daniyal.awan1@gmail.com',
  password: 'mathsucks1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'daniyal.awan2@gmail.com',
  password: 'mathsucks2'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'Test todo 1'
}, {
  _id: new ObjectID(),
  text: 'Test todo 2',
  isCompleted: true,
  completedAt: 333
}];

const populateTodos = function (done) {
  this.timeout(4000);
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos).then(() => done());
  });
};

const populateUsers = function (done) {
  this.timeout(4000);
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};


module.exports = {todos, populateTodos, users, populateUsers};
