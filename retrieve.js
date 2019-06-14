const knex = require('knex')(require('./knexfile'));

module.exports = {
    getBeds() {
        return knex.select().table('beds')
            .catch((err) => {
                console.log(err);
                throw err
            })
    }
};
