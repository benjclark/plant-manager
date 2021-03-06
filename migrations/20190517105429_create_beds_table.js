
exports.up = function(knex) {
    return knex.schema
        .createTable('beds', table => {
            table.increments('id').primary();
            table.string('bed_name').notNullable();
            table.string('bed_soil_characteristics').notNullable();
            table.string('bed_type').notNullable();
            table.integer('bed_width').notNullable();
            table.integer('bed_height').notNullable();
            table.string('bed_colour').notNullable();
            table.integer('bed_x').notNullable();
            table.integer('bed_y').notNullable();
            table.timestamps(false, true);
        })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('beds');
    return;
};
