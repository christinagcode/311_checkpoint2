let express = require("express");

let router = express.Router();

let controller = require("../controllers/controllerUser");

router.post("/userNamePets", controller.addItem);
router.put("/userNamePets/:id", controller.editItem);
router.get("/userNamePets", controller.listItem);
router.get("/userNamePets/:id", controller.getItem);
router.delete("/userNamePets/:id", controller.deleteItem);

module.exports = router;
