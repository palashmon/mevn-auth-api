const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Setup all /users routes
router.post("/register", userController.validateRegister, userController.register);
router.post("/login", userController.login);
router.get("/profile", authController.isLoggedIn, userController.profile);
router.get("/logout", authController.logout);

module.exports = router;
