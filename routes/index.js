const express = require("express");
const router = express.Router();
const manifest = require("../public/manifest.json");
const api = require("./api");

router.use("/api", api);

router.get("*", (req, res) => {
    res.render("index", {manifest});
});

module.exports = router;