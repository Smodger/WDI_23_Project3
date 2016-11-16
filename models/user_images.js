const mongoose = require('mongoose');

const userImages = new mongoose.Schema({
  image: { type: String },
  caption: { type: String },
  projectId: { type: String },
  location: { lat: Number, lng: Number, name: String }
});

module.exports = mongoose.model('userImages', userImages);
