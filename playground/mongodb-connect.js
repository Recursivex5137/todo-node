const { MongoClient } = require('mongodb');

const dbName = 'TodoApp'
const url = `mongodb://localhost:27017`;
const collectionName = 'Todos';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('Unable to connect to mongodb server.');
  }
  console.log('Connected to MongoDB server');

  const db = client.db(dbName);
  //const collection = db.collection(collectionName);
  // collection.insertOne({
  //   text: 'first todo api',
  //   completed: false
  // }, (err, res) => {
  //   if (err) {
  //     console.log(`error when inserting a todo itme: `);
  //     console.log(err);
  //   }
  //   console.log(`successfully inserted:`);
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // })

  // insert new doc into users (name, age, location)
  
  // const collection = db.collection('Users');
  // collection.insertOne({
  //   name: 'Mat',
  //   age: 23,
  //   location: 'millersburg'
  // }, (err, res) => {
  //   if (err) {
  //     console.log(`error when inserting a todo item: `);
  //     console.log(err);
  //   }
  //   console.log(`successfully inserted:`);
  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
  // })

  client.close();
});