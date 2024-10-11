const express = require('express');
const articlesController = require('../controllers/articles');
const router = express.Router();

router.post('/api', articlesController.createArticleController);



module.exports = router;