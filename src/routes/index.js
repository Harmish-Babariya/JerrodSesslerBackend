const express = require("express");
const router = express.Router();

router.use("/api", require("./api"));
router.get('/', (req, res) => {res.send("running...")});

module.exports = router;