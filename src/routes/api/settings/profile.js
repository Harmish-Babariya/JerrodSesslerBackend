const express = require('express');

const { getProfile, updateProfileSchema, updateProfile } = require('../../../controllers/settings/profile');
const { validateRequest } = require('../../../middleware/validate_request');
const { userVerifyToken } = require("../../../middleware/auth");

const router = express.Router();

router.get("/", userVerifyToken, getProfile);
router.post("/", userVerifyToken, validateRequest(updateProfileSchema), updateProfile);

module.exports = router;