const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Test todo 1'
}, {
  _id: new ObjectID(),
  text: 'Test todo 2',
  isCompleted: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos).then(() => done());
  });
});

describe('POST /todos', () => {
  it('should create a new TODO', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 400 due to bad request', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done)
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID();

    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos:id', () => {
  it('should delete a todo', (done) => {
    var id = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(id).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo was not found', (done) => {
    var id = new ObjectID();

    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos:id', () => {
  it('should update the text, isCompleted to true and set completedAt', (done) => {
    var id = todos[0]._id.toHexString();
    var updateObj = {
      text: "Update from code",
      isCompleted: true
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(updateObj)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.isCompleted).toBe(true);
        expect(res.body.todo.completedAt).toBeTruthy();
        expect(res.body.todo.text).toBe(updateObj.text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(id).then((todo) => {
          expect(todo.isCompleted).toBe(true);
          expect(todo.completedAt).toBeTruthy();
          expect(todo.text).toBe(updateObj.text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should update the text, isCompleted to false and set completedAt to null', (done) => {
    var id = todos[1]._id.toHexString();
    var updateObj = {
      text: "Update from code!!",
      isCompleted: false
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(updateObj)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.isCompleted).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
        expect(res.body.todo.text).toBe(updateObj.text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(id).then((todo) => {
          expect(todo.isCompleted).toBe(false);
          expect(todo.completedAt).toBeFalsy();
          expect(todo.text).toBe(updateObj.text);
          done();
        }).catch((e) => done(e));
      });
  });
});
