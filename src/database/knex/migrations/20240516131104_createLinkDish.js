exports.up = (knex) =>
  knex.schema.createTable("linkDish", (table) => {
    table.increments("id")
    table.text("url").notNullable()

    table
      .integer("dish_id")
      .references("id")
      .inTable("dish")
      .onDelete("CASCADE")

    table.timestamp("created_at").default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("linkDish")
