const { Router } = require("express")

const DishController = require("../controllers/DishController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishRoutes = Router()

const dishController = new DishController()

dishRoutes.post("/", ensureAuthenticated, dishController.create)
dishRoutes.get("/:id", dishController.show)
dishRoutes.delete("/:id", dishController.delete)

dishRoutes.get("/", dishController.index)

module.exports = dishRoutes
