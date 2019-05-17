const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/createPlant', (req, res) => {
    store
        .createPlant({
            plant_name: req.body.plant_name,
            date_planted: req.body.date_planted
        })
        .then(() => {
            console.log('Create plant http post:\n', req.body);
            res.sendStatus(200);
        })
});
app.post('/createBed', (req, res) => {
    store
        .createBed({
            bed_name: req.body.bed_name,
            bed_soil_characteristics: req.body.bed_soil_characteristics,
            bed_type: req.body.bed_type
        })
        .then(() => {
            console.log('\x1b[36m%s\x1b[0m', 'Create bed http post:\n', req.body);
            res.sendStatus(200);
        })
});

app.listen(7555, () => {
    console.log('Server running http://local:7555');
});