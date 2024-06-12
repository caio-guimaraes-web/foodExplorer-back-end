exports.up = (knex) =>
  knex.schema.createTable("dish", (table) => {
    table.increments("id")
    table.text("name")
    table.text("description")
    table.text("image_url") // Adiciona a coluna para a URL da imagem
    table.text("category")
    table.integer("user_id").references("id").inTable("users")
    table.decimal("price", 5, 2) // Adiciona a coluna para o preço do prato, capaz de armazenar valores entre 1,00 e 999,99

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("dish")
