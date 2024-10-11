const express = require('express');
const authorsController = require('../controllers/authors');
const router = express.Router();

router.post('/api', authorsController.createAuthorController);



module.exports = router;