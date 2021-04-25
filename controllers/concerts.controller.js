const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch 
  (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Concert.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getNew = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getUpdate = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
      const updatedDep = await Concert.findById(req.params.id);
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
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
      const forDelete = await Concert.findByIdAndDelete({ _id: req.params.id });
      res.json({ message: 'OK', deleted: forDelete });
    }
    else res.status(404).json({ message: 'Not found...' })
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};