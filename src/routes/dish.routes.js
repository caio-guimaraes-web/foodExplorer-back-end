const { Router } = require("express")

const DishController = require("../controllers/DishController")

const dishRoutes = Router()

const dishController = new DishController()

dishRoutes.post("/:user_id", dishController.create)
dishRoutes.get("/:id", dishController.show)
dishRoutes.delete("/:id", dishController.delete)

module.exports = dishRoutes
