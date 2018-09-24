const {ObjectID} = require('mongodb');

const {User} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');

var id = "5ba396698d55364f80a0b505";

User.findById(id).then((user) => {
  if(!user){
    return console.log("User not found!");
  }
  console.log("User: ", user);
}, (err) => {
  console.log("Some error occurred finding the user", err);
});
