const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/profile", require("./settings"));
router.use("/news", require("./news"));
router.use("/stance", require("./stance"));

module.exports = router;