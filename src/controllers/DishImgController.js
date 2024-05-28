const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class DishImgController {
  async update(request, response) {
    const { id: dish_id } = request.params // Extrair o dish_id
    const avatarFilename = request.file.filename
    const user_id = request.user.id

    /* o ensureauthenticated possui id do usuário */
    const user = await knex("users").where({ id: user_id }).first()

    if (!user || !user.is_admin) {
      throw new AppError("Este usuário não é um administrador.", 403)
    }

    const diskStorage = new DiskStorage()

    const dish = await knex("dish").where({ id: dish_id }).first()

    if (!dish) {
      throw new AppError("Prato não encontrado", 404)
    }

    if (dish.image_url) {
      await diskStorage.deleteFile(dish.image_url)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    dish.image_url = filename

    await knex("dish").update(dish).where({ id: dish_id })

    return response.json(dish)
  }
}

module.exports = DishImgController
