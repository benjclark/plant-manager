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
    updateBedPosition({bed_name, bed_x, bed_y}) {
        const _bed_name = bed_name;
        const _bed_x = bed_x;
        const _bed_y = bed_y;

        return knex('beds').where({bed_name: _bed_name})
            .update({bed_x: _bed_x})
            .update({bed_y: _bed_y})
    },
    updateBed({bed_name, bed_soil_characteristics, bed_type, bed_width, bed_height, bed_colour}) {
        const _bed_name = bed_name;
        const _bed_soil_characteristics = bed_soil_characteristics;
        const _bed_type = bed_type;
        const _bed_width = bed_width;
        const _bed_height = bed_height;
        const _bed_colour = bed_colour;

        return knex('beds').where({bed_name: _bed_name})
            .update({bed_soil_characteristics: _bed_soil_characteristics})
            .update({bed_type: _bed_type})
            .update({bed_width: _bed_width})
            .update({bed_height: _bed_height})
            .update({bed_colour: _bed_colour})
    },
    deleteBed({bed_name}) {
        const _bed_name = bed_name;
        return knex('beds').where({bed_name: _bed_name}).del()

    }
};