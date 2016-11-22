const mongoose  = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String },
  finishDate: { type: String },
  cost: { type: String, required: true },
  location: { lat: Number, lng: Number },
  placeName: { String },
  description: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  like: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  projectCreator: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [{ type: String }],
  participants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Challenge', challengeSchema);
