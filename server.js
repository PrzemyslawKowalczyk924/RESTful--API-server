const express = require('express');
//const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
//const path = require('path');
const app = express();
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertRoutes);
app.use('/', seatsRoutes);

app.get('/', (req, res) => {
  res.json(db);
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});