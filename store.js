const knex = require('knex')(require('./knexfile'));

module.exports = {
    createPlant({plant_name, date_planted}) {
        return knex('plants').insert({
            plant_name,
            date_planted
        })
    },
    createBed({bed_name, bed_soil_characteristics, bed_type}) {
        return knex('beds').insert({
            bed_name,
            bed_soil_characteristics,
            bed_type
        })
    }
};