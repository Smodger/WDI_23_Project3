const mongoose  = require('mongoose');
const storyEntries = require('./story_entries');

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  challengeId: { type: mongoose.Schema.ObjectId, ref: 'Challenge' },
  entries: [storyEntries.schema]
});

module.exports = mongoose.model('Story', storySchema);
