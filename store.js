const knex = require('knex')(require('./knexfile'));

module.exports = {
    createPlant({plant_name, date_planted}) {
        console.log(`Plant added with name: ${plant_name} on date: ${date_planted}`);
        return knex('plants').insert({
            plant_name,
            date_planted
        })
    }
};