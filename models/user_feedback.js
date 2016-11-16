const mongoose = require('mongoose');

const userFeedback = new mongoose.Scema({
  giver: { type: String },
  feedback: { type: String },
  date: { type: Date }
});

module.exports = mongoose.model('userFeedback', userFeedback);
