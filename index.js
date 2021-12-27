const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const userName = process.env.DB_USER;
const password = process.env.DB_PASS;

const uri = `mongodb+srv://${userName}:${password}@cluster0.kwnsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})




client.connect(err => {
  const collection = client.db("volunteer").collection("events");
  console.log('database connected')

  app.post('/addEvent', (req, res) => {
    const event = req.body;
    console.log(event)
    collection.insertOne(event)
    .then(result => {
      console.log(result);
      res.send(result.acknowledged)
    })
  })

  app.get('/events', (req, res) => {
    collection.find({}).toArray()
    .then(result => {
      console.log(result)
      res.send(result)
    })
  })

});


app.listen(port)