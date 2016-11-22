const mongoose = require('mongoose');

const storyEntries = new mongoose.Schema({
  title: { type: String },
  shortIntro: { type: String },
  mainContent: { type: String },
  photos: [{
    url: { type: String },
    caption: { type: String }
  }],
  dateAdded: { type: Date },
  order: { type: Number }
});

module.exports = mongoose.model('StoryEntries', storyEntries);
