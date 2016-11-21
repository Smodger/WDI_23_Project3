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
  console.log('challenge clicked on: ', req.params.id);
  challenge.findById(req.params.id, (err, challenge) => {
    if (err) return res.status(500).json({error: err});
    if (!challenge) return res.status(404).json({error: 'NOT FOUND!'});
    // return res.json(challenge);
  })
  .populate('participants.data.ids')
  .exec((err, challenge) => {
    if(err) {
      console.log(err);
      // return res.json(err);
      // return res.status(500).json({error: err});
      return;
    }
    console.log('the challenge: ', challenge);
      // challenge[0].participantsList = [];
      // for(const item in challenge.participants) {
      //   challenge[0].participantsList.push(item._id);
      // }
      // console.log(challenge[0], challenge[0].participantsList);
  }).then((challenge) => {
    console.log(challenge);
    console.log('dont cha wish this worked?');
    return res.json(challenge);
  });

}


//UPDATE
function challengesUpdate(req, res) {
  challenge.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, challenge) => {
    if (err) return res.status(500).json({error: err});
    if (!challenge) return res.status(404).json({error: 'NOT FOUND!'});
    return res.status(200).json(challenge);
  });
}

//DELETE
function challengesDelete(req, res) {
  challenge.findByIdAndRemove(req.params.id, (err, challenge) => {
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
