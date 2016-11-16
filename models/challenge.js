const mongoose  = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String },
  finishDate: { type: String },
  cost: { type: String, required: true },
  location: { lat: Number, lng: Number },
  description: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  like: { type: Number, required: true }
});

module.exports = mongoose.model('Challenge', challengeSchema);
