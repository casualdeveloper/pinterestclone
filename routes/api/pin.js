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

router.post("/likePin",AuthController.JWTLogin, UserController.likePin, PinController.likePin, (req, res) => {
    console.log("===========L I K E D============");
    res.status(200).json({ generalMessage: "Pinned", pinId: req.body.pinId, userId: req.user.id });
});
router.post("/unlikePin",AuthController.JWTLogin, UserController.unlikePin, PinController.unlikePin, (req, res) => {
    console.log("===========U N L I K E D========");
    res.status(200).json({ generalMessage: "Unpinned", pinId: req.body.pinId, userId: req.user.id });
});

module.exports = router;