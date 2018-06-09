const clarifai = require('clarifai');

const app = new clarifai.App({ apiKey: 'b07e482d7053445190cb204f573b9e6e' });

const handleApiCall = (req, res) => {
  app.models
    .predict(
      clarifai.FACE_DETECT_MODEL,
      req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const {
    id,
  } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}
