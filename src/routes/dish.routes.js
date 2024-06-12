const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishController = require("../controllers/DishController")
const DishImgController = require("../controllers/DishImgController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishController = new DishController()
const dishImgController = new DishImgController()

dishRoutes.post("/", ensureAuthenticated, dishController.create)
dishRoutes.get("/:id", dishController.show)
dishRoutes.delete("/:id", dishController.delete)
dishRoutes.get("/", dishController.index)
dishRoutes.put("/:id", ensureAuthenticated, dishController.update)

dishRoutes.patch(
  "/img/:id",
  ensureAuthenticated,
  upload.single("image"),
  dishImgController.update
)

module.exports = dishRoutes
