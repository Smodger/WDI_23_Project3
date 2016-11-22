const entry = require('../models/story_entries');


//CREATE
function entryCreate(req, res) {
  entry.create(req.body, (err, entry) => {
    if (err) return res.status(400).json({error: err});
    return res.status(200).json(entry);
  });
}

//UPDATE
function entryUpdate(req, res) {
  entry.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, entry) => {
    if (err) return res.status(500).json({error: err});
    if (!entry) return res.status(404).json({error: 'NOT FOUND!'});
    return res.status(200).json(entry);
  });
}

//DELETE
function entryDelete(req, res) {
  entry.findByIdAndRemove(req.params.id, (err, entry) => {
    if (err) return res.status(500).json({error: err});
    if (!entry) return res.status(404).json({ error: 'NOT FOUND!' });
    return res.status(204).send();
  });
}

module.exports = {
  create: entryCreate,
  update: entryUpdate,
  delete: entryDelete
};
