
exports.up = function(knex) {
    return knex.schema
        .createTable('plants', table => {
            table.increments('id').primary();
            table.string('plant_name').notNullable();
            table.date('date_planted').notNullable();
            table.timestamps(false, true);
        })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('plants');
    return;
};
