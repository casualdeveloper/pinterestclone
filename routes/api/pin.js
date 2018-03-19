const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/authentication");
const PinController = require("../../controllers/pin");
const UserController = require("../../controllers/user");

router.post("/newPin", AuthController.JWTLogin, PinController.validateInput, PinController.new, UserController.addNewPin, (req, res) => {
    res.status(200).json({pin: req.pin, generalMessage: "Pin saved"});
});
router.post("/deletePin", AuthController.JWTLogin, UserController.deletePin, PinController.delete, (req, res) => {
    res.status(200).json({generalMessage:"Pin deleted"});
});
router.post("/fetchAll", PinController.fetch, (req, res) => {
    res.status(200).json({pins: req.fetchedPins});
});
router.post("/userPins", PinController.fetchUserPins, (req, res) => {
    res.status(200).json({pins: req.fetchedPins});
});


module.exports = router;