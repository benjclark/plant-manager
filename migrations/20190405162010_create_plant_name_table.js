
exports.up = function(knex, Promise) {
  return knex.schema.createTable('plants', function (table) {
      table.increments('id').primary();
      table.string('plantName').notNullable();
      table.string('datePlanted').notNullable();
      table.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
