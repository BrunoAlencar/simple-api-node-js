require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const URI = process.env.MONGODB_URI;
const client = new MongoClient(URI,);
const DATABASE = process.env.MONGODB_NAME;

app.get('/users', async (req, res) => {
  try {
    await client.connect();
    const database = client.db(DATABASE);
    const collection = database.collection('users');
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});