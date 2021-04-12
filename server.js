const express = require('express');
const { v4: uuidv4 } = require('uuid');
//const cors = require('cors');
const app = express();
//const db = require('./db')
//import { v4 as uuidv4 } from 'uuid';


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Genowefa Doe', text: 'This is what I call luck.' },
  { id: 4, author: 'Arnold Doe', text: 'Where the hell are we?' },
  { id: 5, author: 'Xeno Doe', text: 'What ever...' },
];

const message = { message: 'OK!' };

const v4options = {
  random: [1, 2, 3, 4, 5]
};

app.get('/', (req, res) => {
  res.json(db);
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[`${req.params.id}`-1]);
});

app.get('/random', (req, res) => {
  const random = db[Math.floor(Math.random() * db.length)];
  res.json(random);
});

app.post('/testimonials', (req, res) => {
  const { author, text, id} = req.body;
  const addRecord = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  
  db.push(addRecord)
  res.json(message);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text} = req.body;
  const editRecord = db.find(item => item.id == `${req.params.id}`);
  editRecord.author = req.body.author,
  editRecord.text = req.body.text
  res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});