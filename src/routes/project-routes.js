
const express = require('express');
const projectController = require('../controllers/projects');
const router = express.Router();

router.post('/', projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectsById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);


module.exports = router;
