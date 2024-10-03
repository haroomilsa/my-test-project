const express = require('express');
const userController = require('../controllers/user-controller');
const projects = require('../controllers/projects');
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


router.post('/projects', projects.createProject);
router.get('/projects', projects.getAllProjects);
router.get('/projects/:id', projects.getProjectsById);
router.put('/projects/:id', projects.updateProject);
router.delete('/projects/:id', projects.deleteProject);

module.exports = router;
