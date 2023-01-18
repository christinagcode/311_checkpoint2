let express = require("express");

let router = new express.Router();

let controller = require("../controllers/authControllers");

/**
 * POST /register
 */
router.post("/register", controller.register)

/**
 * POST /login
 */
router.post("/login", controller.login);

module.exports = router;