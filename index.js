const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const retrieve = require('./retrieve');

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
            bed_type: req.body.bed_type,
            bed_width: req.body.bed_width,
            bed_height: req.body.bed_height,
            bed_colour: req.body.bed_colour,
            bed_x: req.body.bed_x,
            bed_y: req.body.bed_y
        })
        .then(() => {
            console.log('\x1b[36m%s\x1b[0m', 'Create bed http post:\n', req.body);
            res.sendStatus(200);
        })
});
app.post('/updateBedPosition', (req, res) => {
    store
        .updateBedPosition({
            bed_name: req.body.bed_name,
            bed_x: req.body.bed_x,
            bed_y: req.body.bed_y
        })
        .then(() => {
            res.sendStatus(200);
        })
});
app.post('/updateBed', (req, res) => {
    store
        .updateBed({
            bed_name: req.body.bed_name,
            bed_soil_characteristics: req.body.bed_soil_characteristics,
            bed_type: req.body.bed_type,
            bed_width: req.body.bed_width,
            bed_height: req.body.bed_height,
            bed_colour: req.body.bed_colour
        })
        .then(() => {
            console.log('updated bed ', req.body);
            res.sendStatus(200);
        })
});
app.get('/getBeds', (req, res) => {
    retrieve.getBeds()
        .then((response) => {
            res.send(response)
        })
});

app.listen(7555, () => {
    console.log('Server running http://local:7555');
});