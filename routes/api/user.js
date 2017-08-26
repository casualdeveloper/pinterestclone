const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/authentication");

router.post("/login", AuthController.localLogin, AuthController.login);

router.post("/JWTLogin", AuthController.JWTLogin, AuthController.login);

router.post("/signup", AuthController.register, AuthController.login);

module.exports = router;