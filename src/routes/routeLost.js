let express = require("express");

let router = express.Router();

let controller = require("../controllers/controllerLost");

router.post("/lostPets", controller.addItem);
router.put("/lostPets/:id", controller.editItem);
router.get("/lostPets", controller.listItem);
router.get("/lostPets/:id", controller.getItem);
router.delete("/lostPets/:id", controller.deleteItem);

module.exports = router;
