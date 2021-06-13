const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);
  
router.get('/concerts/:id', ConcertController.getId);

router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getByMinMaxPrice);

router.get('/concerts/day/:day', ConcertController.getByDay);
  
router.post('/concerts', ConcertController.getNew);
  
router.put('/concerts/:id', ConcertController.getUpdate); 

router.delete('/concerts/:id', ConcertController.getDelete); 

module.exports = router;