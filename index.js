const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/createPlant', (req, res) => {
  store
      .createUser({
          plantName: req.body.plantName,
          datePlanted: req.body.datePlanted
      })
      .then(() => {
          res.sendStatus(200);
      })
});

app.listen(7555, () => {
    console.log('Server running http://local:7555');
});