
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('houses', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('secret_key');
      table.integer('members');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.integer('house_key');
      table.foreign('house_key').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('bills', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.boolean('all_paid');
      table.string('total');
      table.string('split_type');
      table.integer('house_key');
      table.foreign('house_key').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('bills_by_users', function(table) {
      table.increments('id').primary();
      table.string('amount');
      table.integer('user_key');
      table.foreign('user_key').references('users.id');
      table.integer('bill_key');
      table.foreign('bill_key').references('bills.id');
      table.boolean('paid');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('chores', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.boolean('done');
      table.string('urgency');
      table.integer('user_key');
      table.foreign('user_key').references('users.id');
      table.integer('house_key');
      table.foreign('house_key').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('bulletins', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.boolean('all_read');
      table.integer('posted_by');
      table.foreign('posted_by').references('users.id');
      table.integer('house_key');
      table.foreign('house_key').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('bulletins_by_users', function(table) {
      table.increments('id').primary();
      table.integer('user_key');
      table.foreign('user_key').references('users.id');
      table.integer('bulletin_key');
      table.foreign('bulletin_key').references('bulletins.id');
      table.boolean('read');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('grocery_lists', function(table) {
      table.increments('id').primary();
      table.string('store');
      table.integer('house_key');
      table.foreign('house_key').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('grocery_items', function(table) {
      table.increments('id').primary();
      table.string('item');
      table.integer('quantity');
      table.integer('user_key');
      table.foreign('user_key').references('users.id');
      table.integer('list_key');
      table.foreign('list_key').references('grocery_lists.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.dateTime('date_and_time');
      table.integer('house_key');
      table.foreign('house_key').references('houses.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events'),
    knex.schema.dropTable('grocery_items'),
    knex.schema.dropTable('grocery_lists'),
    knex.schema.dropTable('bulletins_by_users'),
    knex.schema.dropTable('bulletins'),
    knex.schema.dropTable('chores'),
    knex.schema.dropTable('bills_by_users'),
    knex.schema.dropTable('bills'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('houses')
  ]);
};
