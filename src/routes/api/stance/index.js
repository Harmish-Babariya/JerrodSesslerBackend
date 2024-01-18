const express = require("express");
const router = express.Router();

router.use("/", require("./stance"));

module.exports = router;