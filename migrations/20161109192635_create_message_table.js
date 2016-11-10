
exports.up = function(knex, Promise) {
    return knex.schema.createTable('message', function(table){
        table.bigIncrements();
        table.string('to').notNullable();
        table.string('from').notNullable();
        table.string('body').notNullable();
        table.dateTime('expiration_date').nullable();
        table.integer('status_code').nullable();
        table.dateTime('created_at').nullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('message');
};
