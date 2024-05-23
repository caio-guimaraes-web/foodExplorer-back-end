const { Router } = require("express")

const usersRoutes = require("./users.routes")
const dishRoutes = require("./dish.routes")
const ingredientsRoutes = require("./ingredients.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/dish", dishRoutes)
routes.use("/ingredients", ingredientsRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes
