
const express = require('express');
const router = express.Router();
const userProjectsController = require('../controllers/user-projects');



router.post('/api', userProjectsController.assignProjectToUser); 
router.get('/:userId', userProjectsController.getUserProjects); 
router.delete('/:userId/:projectId', userProjectsController.deleteUserProject); 

module.exports = router;
