const express = require("express");
const router = express.Router();

router.use("/", require("./news"));

module.exports = router;