let express = require("express");

let router = express.Router();

let controller = require("../controllers/controllerFound");

router.post("/foundPets", controller.addItem);
router.put("/foundPets/:id", controller.editItem);
router.get("/foundPets", controller.listItem);
router.get("/foundPets/:id", controller.getItem);
router.delete("/foundPets/:id", controller.deleteItem);

module.exports = router;
