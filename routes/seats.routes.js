const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'OK!' };

// get all posts
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const random = db.seats[Math.floor(Math.random() * db.seats.length)];
  res.json(random);
});
  
router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[`${req.params.id}`-1]);
});
  
router.route('/seats').post((req, res) => {
  const { id, day, seat, client, email } = req.body;
  const addRecord = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  
  const isBusy = db.seats.some((item) => {
    return item.day == addRecord.day && item.seat == addRecord.seat;
  });
  if(!isBusy) {
    db.seats.push(addRecord) 
    res.json(message);
  } else {
    res.status(409).json({ message: "The slot is already taken..." });
  };
});
  
router.route('/seats/:id').put((req, res) => {
  const { id, day, seat, client, email } = req.body;
  const editRecord = db.seats.find(item => item.id == `${req.params.id}`);
  editRecord.day = req.body.day,
  editRecord.seat = req.body.seat,
  editRecord.client = req.body.client,
  editRecord.email = req.body.email,
  res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

module.exports = router;