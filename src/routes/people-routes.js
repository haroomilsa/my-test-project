const express = require('express');
const projectController = require('../controllers/peoples');
const router = express.Router();


router.post('/', projectController.signUp);


module.exports = router;