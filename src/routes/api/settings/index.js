const express = require("express");
const router = express.Router();

router.use("/", require("./profile"));

module.exports = router;