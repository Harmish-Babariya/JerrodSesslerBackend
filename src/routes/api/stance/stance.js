const express = require('express');

const { createStance, stanceSchema, getStance, getSingleStance, updateStance, deleteStance } = require('../../../controllers/stance/stance');
const { validateRequest } = require('../../../middleware/validate_request');
const { userVerifyToken } = require("../../../middleware/auth");

const router = express.Router();

router.post("/create", userVerifyToken, validateRequest(stanceSchema), createStance);
router.get("/", userVerifyToken, getStance);
router.get("/:id", userVerifyToken, getSingleStance);
router.put("/:id", userVerifyToken, validateRequest(stanceSchema),updateStance);
router.delete("/:id", userVerifyToken, deleteStance);

module.exports = router;