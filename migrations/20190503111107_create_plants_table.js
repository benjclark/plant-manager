
exports.up = function(knex) {
    return knex.schema
        .createTable('plants', table => {
            table.increments('id').primary();
            table.string('plant_name').notNullable();
            table.string('plant_bed').nullable();
            table.string('plant_type').notNullable();
            table.date('plant_date_planted').nullable();
            table.date('plant_last_crop').nullable();
            table.date('plant_next_crop').nullable();
            table.string('plant_icon').notNullable();
            table.integer('plant_x').notNullable();
            table.integer('plant_y').notNullable();
            table.timestamps(false, true);
        })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('plants');
    return;
};
