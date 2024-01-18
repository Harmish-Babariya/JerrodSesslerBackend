const express = require('express');

const { createNews, newsSchema, getNews, getSingleNews, updateNews, deleteNews } = require('../../../controllers/news/news');
const { validateRequest } = require('../../../middleware/validate_request');
const { userVerifyToken } = require("../../../middleware/auth");

const router = express.Router();

router.post("/create", userVerifyToken, validateRequest(newsSchema), createNews);
router.get("/", userVerifyToken, getNews);
router.get("/:id", userVerifyToken, getSingleNews);
router.put("/:id", userVerifyToken, validateRequest(newsSchema),updateNews);
router.delete("/:id", userVerifyToken, deleteNews);

module.exports = router;