const mongoose = require('mongoose');

const userFeedback = new mongoose.Scema({
  feedback: String
});

module.exports = mongoose.model('Feedback', userFeedback);
