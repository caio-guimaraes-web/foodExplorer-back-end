/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro específico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */
const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
  async create(request, response) {
    const { name, email, password, is_admin } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    )

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.")
    }

    await database.run(
      "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
      [name, email, password, is_admin]
    )

    return response.status(201).json()
  }
}

module.exports = UsersController