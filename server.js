const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

// middleware that add allow you to use ".io" -> "req.io" param in other files
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

// connects our backend code with the database
const uri = (envType) => {
  switch(envType) {
    case "production":
      return "mongodb+srv://${process.env.userName}:${process.env.newWaveApp}@cluster0.ikrzt.mongodb.net/NewWaveDB?retryWrites=true&w=majority";
    case "test":
      return "mongodb://localhost:27017/NewWaveDBTest";
    default:
      return "mongodb://localhost:27017/NewWaveDB";  
  }
} 

mongoose.connect(uri(process.env.NODE_ENV), { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id = ' + socket.id);
});

module.exports = server;