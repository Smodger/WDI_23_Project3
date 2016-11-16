const mongoose  = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String },
  finishDate: { type: String },
  cost: { type: String, required: true },
  location: { lat: Number, lng: Number },
  description: { type: String },
  like: { type: Number }
});

module.exports = mongoose.model('Challenge', challengeSchema);
