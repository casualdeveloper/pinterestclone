const express = require("express");
const router = express.Router();
const user = require("./api/user");
const pin = require("./api/pin");
const twitter = require("./api/twitter");

router.use("/user", user);
router.use("/pin", pin);

module.exports = router;