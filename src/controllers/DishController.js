const knex = require("../database/knex")

class DishController {
  async create(request, response) {
    const { title, description, image_url, ingredients } = request.body
    const { user_id } = request.params

    const [dish_id] = await knex("dish").insert({
      title,
      description,
      user_id,
    })

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id,
        name: ingredient,
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json()
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
    const { title, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredients) => ingredients.trim())

      dishes = await knex("ingredients")
        .select(["dish.id", "dish.title", "ingredients.name"])
        .whereLike("dish.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("dish", "dish.id", "ingredients.dish_id")
        .orderBy("dish.title")
    } else {
      dishes = await knex("dish")
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userIngredients = await knex("ingredients")
    const dishWhithIngredients = dishes.map((dish) => {
      const dishIngredients = userIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      )

      return {
        ...dish,
        ingredients: dishIngredients,
      }
    })

    return response.json(dishWhithIngredients)
  }
}

module.exports = DishController
