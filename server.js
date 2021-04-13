const express = require('express');
const { v4: uuidv4 } = require('uuid');
//const cors = require('cors');
const app = express();
const db = require('./db')
//import { v4 as uuidv4 } from 'uuid';


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());

const message = { message: 'OK!' };

const v4options = {
  random: [1, 2, 3, 4, 5]
};

app.get('/', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(random);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials[`${req.params.id}`-1]);
});



app.post('/testimonials', (req, res) => {
  const { author, text, id} = req.body;
  const addRecord = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  
  db.testimonials.push(addRecord)
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
  db.testimonials.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});