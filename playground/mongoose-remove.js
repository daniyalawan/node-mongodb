const {ObjectID} = require('mongodb');

const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');
const {mongoose} = require('./../server/db/mongoose');

var id = "5ba6b1e31cdfdd5258201f68";

// Todo.remove({})    The argument is mandatory
// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findOneAndRemove    This finds and remove the first item and send it back as well

// Todo.findByIdAndDelete   Returns doc
Todo.findByIdAndDelete(id).then((todo) => {
  console.log(todo);
});
