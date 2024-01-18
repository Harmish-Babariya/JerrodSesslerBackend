const express = require('express');

const { login, loginSchema } = require('../../../controllers/auth/login');
const { validateRequest } = require('../../../middleware/validate_request');

const router = express.Router();

router.post("/", validateRequest(loginSchema), login);

module.exports = router;