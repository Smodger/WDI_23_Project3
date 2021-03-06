const User = require('../models/user');

//INDEX
function usersIndex(req, res) {
  User.find((err, users) => {
    if (err) return res.status(500).json({error: err});
    return res.json(users);
  });
}

//CREATE
function usersCreate(req, res) {
  User.create(req.body, (err, user) => {
    if (err) return res.status(400).json({error: err});
    return res.json(user);
  });
}

//SHOW
function usersShow(req, res) {
  User.findById(req.params.id)
    .populate('activeChallenges')
    .exec((err, user) => {
      if (err) return res.status(500).json({error: err});
      if (!user) return res.status(404).json({error: 'NOT FOUND!'});
      return res.json(user);
    });
}

//UPDATE
function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) return res.status(500).json({error: err});
    if (!user) return res.status(404).json({error: 'NOT FOUND!'});

    User.findById(req.params.id)
      .populate('activeChallenges')
      .exec((err, user) => {
        if (err) return res.status(500).json({error: err});
        return res.json(user);
      });
  });
}

//DELETE
function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).json({error: err});
    if (!user) return res.status(404).json({error: 'NOT FOUND!'});
    return res.status(204).send();
  });
}

module.exports = {
  index: usersIndex,
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
