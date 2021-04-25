const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/random', SeatController.getRandom);
  
router.get('/seats/:id', SeatController.getId);
  
router.post('/seats', SeatController.getNew);
  
router.put('/seats/:id', SeatController.getUpdate); 

router.delete('/seats/:id', SeatController.getDelete); 

module.exports = router;