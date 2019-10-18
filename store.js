const knex = require('knex')(require('./knexfile'));

module.exports = {
    createPlant({plant_name, plant_bed, plant_type, plant_date_planted, plant_last_crop, plant_next_crop, plant_icon}) {
        return knex('plants').insert({
            plant_name,
            plant_bed,
            plant_type,
            plant_date_planted,
            plant_last_crop,
            plant_next_crop,
            plant_icon
        })
    },
    updatePlantPosition({plant_name, plant_bed, plant_x, plant_y}) {
        const _plant_name = plant_name;
        const _plant_bed = plant_bed;
        const _plant_x = plant_x;
        const _plant_y = plant_y;

        return knex('plants').where({plant_name: _plant_name})
            .update({plant_bed: _plant_bed, plant_x: _plant_x, plant_y: _plant_y})
    },
    updatePlant({plant_name, plant_bed, plant_type, plant_date_planted, plant_last_crop, plant_next_crop, plant_icon}) {
        const _plant_name = plant_name;
        const _plant_bed = plant_bed;
        const _plant_type = plant_type;
        const _plant_date_planted = plant_date_planted;
        const _plant_last_crop = plant_last_crop;
        const _plant_next_crop = plant_next_crop;
        const _plant_icon = plant_icon;

        return knex('plants').where({plant_name: _plant_name})
            .update({plant_bed: _plant_bed})
            .update({plant_type: _plant_type})
            .update({plant_date_planted: _plant_date_planted})
            .update({plant_last_crop: _plant_last_crop})
            .update({plant_next_crop: _plant_next_crop})
            .update({plant_icon: _plant_icon})
    },
    deletePlant({plant_name}) {
        const _plant_name = plant_name;
        return knex('plants').where({plant_name: _plant_name}).del()
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
