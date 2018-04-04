require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
 
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const portNumber = process.env.PORT || 3000;

app.use(bodyParser.json());

// Post /todos
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// Get /todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (err) => {
    res.status(400).send(err);
  });
});

// Get /todos/123245
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send('Invalid Id in parameter.');
  }
  
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return  res.sendStatus(404);
    }
    res.send({todo});
  }).catch((err) => {
    res.sendStatus(404);
  });
});

// Delete /todos/123245
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send('Invalid Id in parameter.');
  }
  
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo)
  }).catch( (err) => {
    return res.sendStatus(404).send(`Couldn't delete todo with id: ${id}`);
  });
});

// Patch /todos/123245
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send('Invalid Id in parameter or body.');
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch( (err) => {
    return res.sendStatus(400).send(`Couldn't update todo with id: ${id}`);
  });
});

// Post /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User({
    email: body.email,
    password: body.password
  });
  user.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});


app.listen(portNumber, () => {
  console.log(`Started on port ${portNumber}`);
});


module.exports = {
  app
};