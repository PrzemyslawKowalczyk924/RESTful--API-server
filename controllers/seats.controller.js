const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch 
  (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Seat.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getNew = async (req, res) => {
  try {
    const { id, day, seat, client, email } = req.body;
    const newSeat = new Seat({ id: id, day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getUpdate = async (req, res) => {
  const { id, day, seat, client, email } = req.body;

  try {
    const dep = await(Seat.findById(req.params.id));
    if(dep) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { id: id, day: day, seat: seat, client: client, email: email } });
      const updatedDep = await Seat.findById(req.params.id);
      res.json({ message: 'OK', updated: updatedDep });
    }
    else res.status(404).json({ message: 'Not found...' })
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDelete = async (req, res) => {
  try {
    const dep = await(Seat.findById(req.params.id));
    if(dep) {
      const forDelete = await Seat.findByIdAndDelete({ _id: req.params.id });
      res.json({ message: 'OK', deleted: forDelete });
    }
    else res.status(404).json({ message: 'Not found...' })
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};