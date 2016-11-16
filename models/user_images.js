const mongoose = require('mongoose');

const userImages = new mongoose.Schema({
  images: [
    { objectId:  }
  ]
});

module.exports = mongoose.model('userImages', userImages);
