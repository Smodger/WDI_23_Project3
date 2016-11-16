const mongoose = require('mongoose');

const userImages = new mongoose.Schema({
  images: [
    { objectId: `{user._id}` }
  ]
});

module.exports = mongoose.model('userImages', userImages);
