const mongoose = require('mongoose');

const storyEntries = new mongoose.Schema({
  title: { type: String },
  shortIntro: { type: String },
  mainContent: { type: String },
  photos: [{ type: String, default: [null,null,null] }],
  dateAdded: { type: Date },
  order: { type: Number }
});

module.exports = mongoose.model('StoryEntries', storyEntries);
