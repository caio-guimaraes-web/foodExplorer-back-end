exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id")
    table.text("name").notNullable()

    table
      .integer("dish_id")
      .references("id")
      .inTable("dish")
      .onDelete("CASCADE")
  })

exports.down = (knex) => knex.schema.dropTable("tags")
