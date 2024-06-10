exports.up = (knex) =>
  knex.schema.createTable("dish", (table) => {
    table.increments("id")
    table.text("title")
    table.text("description")
    table.text("image_url") // Adiciona a coluna para a URL da imagem
    table.text("category")
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("dish")
