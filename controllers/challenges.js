const challenge = require('../models/challenge');

//INDEX
function challengesIndex(req, res) {
  challenge.find((err, challenges) => {
    if (err) return res.status(500).json({error: err});
    return res.json(challenges);
  });
}

//CREATE
function challengesCreate(req, res) {
  challenge.create(req.body, (err, challenge) => {
    if (err) return res.status(400).json({error: err});
    return res.json(challenge);
  });
}

//SHOW
function challengesShow(req, res) {
  challenge.findById(req.params.id, (err, challenge) => {
    if (err) return res.status(500).json({error: err});
    if (!challenge) return res.status(404).json({error: 'NOT FOUND!'});
    return res.json(challenge);
  });
}

//UPDATE
function challengesUpdate(req, res) {
  challenge.findByIdAndUpdate(req.params.id, (err, challenge) => {
    if (err) return res.status(500).json({error: err});
    if (!challenge) return res.status(404).json({error: 'NOT FOUND!'});
    return res.status(200).json(challenge);
  });
}

//DELETE
function challengesDelete(req, res) {
  challenge.findByIdAndRemove(res.params.id, (err, challenge) => {
    if (err) return res.status(500).json({error: err});
    if (!challenge) return res.status(404).json({error: 'NOT FOUND!'});
    return res.status(204).send();
  });
}

module.exports = {
  index: challengesIndex,
  create: challengesCreate,
  show: challengesShow,
  update: challengesUpdate,
  delete: challengesDelete
};
