const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
 
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const portNumber = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  let todo = new Todo({
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
  
  Todo.findByIdAndRemove(id).catch( (err) => {
    return res.sendStatus(404).send(`Couldn't delete todo with id: ${id}`);
  });

  res.send(`Successfully deleted todo with id: ${id}`);
});

// Put /todos/123245
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const doc = req.body;

  if (!ObjectID.isValid(id) && doc.text != (null || '')){
    return res.status(404).send('Invalid Id in parameter or body.');
  }
  
  // Todo.findByIdAndUpdate(id, ).catch( (err) => {
  //   return res.sendStatus(404).send(`Couldn't update todo with id: ${id}`);
  // });
  res.send(doc);
  // res.send(`Successfully updated todo with id: ${id}`);
});

app.listen(portNumber, () => {
  console.log(`Started on port ${portNumber}`);
});


module.exports = {
  app
};