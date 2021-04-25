const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch 
  (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Testimonial.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const dep = await Testimonial.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getNew = async (req, res) => {
  try {
    const { id, author, text } = req.body;
    const newTestimonial = new Testimonial({ id: id, author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getUpdate = async (req, res) => {
  const { id, author, text } = req.body;

  try {
    const dep = await(Testimonial.findById(req.params.id));
    if(dep) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { id: id, author: author, text: text } });
      const updatedDep = await Testimonial.findById(req.params.id);
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
    const dep = await(Testimonial.findById(req.params.id));
    if(dep) {
      const forDelete = await Testimonial.findByIdAndDelete({ _id: req.params.id });
      res.json({ message: 'OK', deleted: forDelete });
    }
    else res.status(404).json({ message: 'Not found...' })
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};