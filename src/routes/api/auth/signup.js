const express = require('express');

const { signup, signupSchema } = require('../../../controllers/auth/signup');
const { validateRequest } = require('../../../middleware/validate_request');

const router = express.Router();

router.post("/", validateRequest(signupSchema), signup);
// router.post("/", signup);

module.exports = router;