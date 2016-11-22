const mongoose  = require('mongoose');

const storySchema = new mongoose.Schema({
  r: { type: mongoose.Schema.ObjectId, ref: 'User' },
  challengeId: { type: mongoose.Schema.ObjectId, ref: 'Challenge' },
  entries: [{
    title: { type: String },
    shortIntro: { type: String },
    mainContent: { type: String },
    photos: [{
      url: { type: String },
      caption: { type: String }
    }],
    dateAdded: { type: Date },
    order: { type: Number }
  }]
});

module.exports = mongoose.model('Story', storySchema);
