
const express = require('express');
const projectController = require('../controllers/projects');
const router = express.Router();

router.post('/api', projectController.createProjectController);
router.get('/api', projectController.getAllProjectsController);
router.get('/:id', projectController.getProjectsByIdController);
router.put('/:id', projectController.updateProjectController);
router.delete('/:id', projectController.deleteProjectController);


module.exports = router;
