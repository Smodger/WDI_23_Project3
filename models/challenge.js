const mongoose  = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: true },
  cost: { type: String, required: true },
  location: { lat: Number, lng: Number },
  description: { type: String, required: true },
  like: { type: Number, required: true }
});

module.exports = mongoose.model('Challenge', challengeSchema);
