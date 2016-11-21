const story = require('../models/story');

//INDEX
function storysIndex(req, res) {
  story.find((err, stories) => {
    if (err) return res.status(500).json({error: err});
    return res.json(stories);
  })
  .populate('userId', 'username profilePhoto')
  .populate('challengeId', '_id name location')
    .exec(function(err, story) {
      if(err) return res.json(err);
      console.log(story);
    })
  .then((story) => {
    console.log(story);
    return res.json(story);
  });
}

//CREATE
function storysCreate(req, res) {
  story.create(req.body, (err, story) => {
    if (err) return res.status(400).json({error: err});
    return res.json(story);
  });
}

//SHOW
function storysShow(req, res) {
  story.findById(req.params.id, (err, story) => {
    if (err) return res.status(500).json({error: err});
    if (!story) return res.status(404).json({error: 'NOT FOUND!'});
  })
  .populate('userId', 'username profilePhoto')
  .populate('challengeId', '_id name location')
    .exec(function(err, story) {
      if(err) return res.json(err);
      console.log(story);
    })
  .then((story) => {
    console.log(story);
    return res.json(story);
  });
}

//UPDATE
function storysUpdate(req, res) {
  story.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, story) => {
    if (err) return res.status(500).json({error: err});
    if (!story) return res.status(404).json({error: 'NOT FOUND!'});
    return res.status(200).json(story);
  });
}

//DELETE
function storysDelete(req, res) {
  story.findByIdAndRemove(req.params.id, (err, story) => {
    if (err) return res.status(500).json({error: err});
    if (!story) return res.status(404).json({ error: 'NOT FOUND!' });
    return res.status(204).send();
  });
}

module.exports = {
  index: storysIndex,
  create: storysCreate,
  show: storysShow,
  update: storysUpdate,
  delete: storysDelete
};
