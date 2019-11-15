const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const retrieve = require('./retrieve');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
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
app.post('/createPlant', (req, res) => {
    store
        .createPlant({
            plant_name: req.body.plant_name,
            plant_bed: req.body.plant_bed,
            plant_type: req.body.plant_type,
            plant_date_planted: req.body.plant_date_planted,
            plant_last_crop: req.body.plant_last_crop,
            plant_next_crop: req.body.plant_next_crop,
            plant_icon: req.body.plant_icon
        })
        .then(() => {
            console.log('Create plant http post:\n', req.body);
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
            console.log('\x1b[36m%s\x1b[0m', 'Update beds position:\n', req.body);
            res.sendStatus(200);
        })
});
app.post('/updatePlantPosition', (req, res) => {
    store
        .updatePlantPosition({
            plant_name: req.body.plant_name,
            plant_bed: req.body.plant_bed,
            plant_x: req.body.plant_x,
            plant_y: req.body.plant_y
        })
        .then(() => {
            console.log('\x1b[36m%s\x1b[0m', 'Update plant bed:\n', req.body);
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
            res.sendStatus(200);
        })
});
app.post('/updatePlant', (req, res) => {
    store
        .updatePlant({
            plant_name: req.body.plant_name,
            plant_bed: req.body.plant_bed,
            plant_type: req.body.plant_type,
            plant_date_planted: req.body.plant_date_planted,
            plant_last_crop: req.body.plant_last_crop,
            plant_next_crop: req.body.plant_next_crop,
            plant_icon: req.body.plant_icon
        })
        .then(() => {
            res.sendStatus(200);
        })
});
app.post('/deleteBed', (req, res) => {
    store
        .deleteBed({
            bed_name: req.body.bed_name
        })
        .then(() => {
            res.sendStatus(200);
        })
});
app.post('/deletePlant', (req, res) => {
    store
        .deletePlant({
            plant_name: req.body.plant_name
        })
        .then(() => {
            res.sendStatus(200);
        })
});
app.get('/getBeds', (req, res) => {
    retrieve.getBeds()
        .then((response) => {
            res.send(response)
        })
});
app.get('/getPlants', (req, res) => {
    retrieve.getPlants()
        .then((response) => {
            res.send(response)
        })
});

app.listen(7555, () => {
    console.log('Server running http://localhost:7555');
});
