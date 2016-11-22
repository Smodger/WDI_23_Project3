const mongoose  = require('mongoose');
const StoryEntries = require('./story_entries');

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  challengeId: { type: mongoose.Schema.ObjectId, ref: 'Challenge' },
  entries: [StoryEntries.schema]
});

module.exports = mongoose.model('Story', storySchema);
