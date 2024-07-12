const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class DishController {
  async create(request, response) {
    const { name, description, category, price, image_url, ingredients } =
      request.body
    const user_id = request.user.id

    // Valida se o usuário é administrador para dar permissão à criação de pratos
    const user = await knex("users").where({ id: user_id }).first()

    if (!user || !user.is_admin) {
      throw new AppError("Este usuário não é um administrador.", 403)
    }

    const [dish_id] = await knex("dish").insert({
      name,
      description,
      category,
      price,
      user_id,
    })

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id,
        name: ingredient,
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    // Retorna o ID do prato criado
    response.json({ id: dish_id })
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dish").where({ id }).first()
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name")

    return response.json({
      ...dish,
      ingredients,
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("dish").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { name, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())

      dishes = await knex("ingredients")
        .select(["dish.id", "dish.name", "ingredients.name"])
        .whereLike("dish.name", `%${name}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dish", "dish.id", "ingredients.dish_id")
        .orderBy("dish.name")
    } else if (name) {
      dishes = await knex("dish").whereLike("name", `%${name}%`).orderBy("name")
    } else {
      // Novo bloco para retornar todos os pratos
      dishes = await knex("dish").orderBy("name")
    }

    const userIngredients = await knex("ingredients")
    const dishWithIngredients = dishes.map((dish) => {
      const dishIngredients = userIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      )

      return {
        ...dish,
        ingredients: dishIngredients,
      }
    })

    return response.json(dishWithIngredients)
  }

  async update(request, response) {
    const { id } = request.params
    const { name, description, image_url, ingredients } = request.body
    const user_id = request.user.id

    const user = await knex("users").where({ id: user_id }).first()

    if (!user || !user.is_admin) {
      throw new AppError("Este usuário não é um administrador.", 403)
    }

    const dish = await knex("dish").where({ id }).first()

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    await knex("dish").where({ id }).update({
      name,
      description,
      image_url,
      updated_at: knex.fn.now(),
    })

    if (ingredients && ingredients.length > 0) {
      await knex("ingredients").where({ dish_id: id }).delete()

      const ingredientsInsert = ingredients.map((ingredient) => {
        return {
          dish_id: id,
          name: ingredient,
        }
      })

      await knex("ingredients").insert(ingredientsInsert)
    }

    response.json()
  }
}

module.exports = DishController
