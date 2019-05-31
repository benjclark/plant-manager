const knex = require('knex')(require('./knexfile'));

module.exports = {
    createPlant({plant_name, date_planted}) {
        return knex('plants').insert({
            plant_name,
            date_planted
        })
    },
    createBed({bed_name, bed_soil_characteristics, bed_type, bed_width, bed_height, bed_colour, bed_x, bed_y}) {
        return knex('beds').insert({
            bed_name,
            bed_soil_characteristics,
            bed_type,
            bed_width,
            bed_height,
            bed_colour,
            bed_x,
            bed_y
        })
    },
    updateRecPosition({bed_name, bed_x, bed_y}) {
        const _bed_name = bed_name;
        const _bed_x = bed_x;
        const _bed_y = bed_y;

        return knex('beds').where({bed_name: _bed_name})
            .update({bed_x: _bed_x})
            .update({bed_y: _bed_y})
    }
};