let express = require("express");

let router = express.Router();

let controller = require("../controllers/controllerFound");

// anyone can post.. need to add middle ware check to post
router.post("/foundPets", controller.addItem);
// anyone can put.. need to add middle ware check to post
router.put("/foundPets/:id", controller.editItem);
router.get("/foundPets", controller.listItem);
router.get("/foundPets/:id", controller.getItem);
// delete middleware 
router.delete("/foundPets/:id", controller.deleteItem);

module.exports = router;
