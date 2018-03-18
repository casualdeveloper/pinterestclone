const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/authentication");
const passport = require("passport");
const twitterUtil = require("./twitter");
const URL = require("url");

//append responseObj to all routes
router.all("*", function(req, res, next){
    req.responseObj = {};
    next();
});

router.post("/login", AuthController.localLogin, AuthController.login, function(req, res){
    res.status(200).json({ token: req.responseObj.JWT, user: req.responseObj.user });
});
//login user from JWT
router.post("/JWTLogin", AuthController.JWTLogin, AuthController.login, function(req, res){
    res.status(200).json({ token: req.responseObj.JWT, user: req.responseObj.user });
});

router.post("/signup", AuthController.register, function(req, res){
    res.status(200).json({ token: req.responseObj.JWT, user: req.responseObj.user });
});

router.get("/twitterAuthRequest", twitterUtil.getTwitterAuthLink, function(req, res){
    res.status(200).json({ twitter_auth_url: req.responseObj.TWITTER_AUTH_URL });
});

router.get("/twitterCallback", function(req, res) {
    let twitterCallbackQuery = URL.parse(req.url).search;
    res.send("<script>window.twitterCallbackQuery='"+twitterCallbackQuery+"';window.close();</script>");
});

router.get("/twitterAuth", twitterUtil.getTwitterAccessToken, twitterUtil.getTwitterProfile, AuthController.twitterLogin, AuthController.login, function(req, res) {
    res.status(200).json({ token: req.responseObj.JWT, user: req.responseObj.user });
});


module.exports = router;