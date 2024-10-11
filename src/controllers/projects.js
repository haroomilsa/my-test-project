const {
  createProject,
  findProjectByName,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../models/projects-model');


exports.createProjectController = async (req, res) => {
  const {  project_name, description } = req.body;
  switch (true) {
    case !project_name:
      return res.status(400).json({ error: 'Project Name is required' });
    case !description:
      return res.status(400).json({ error: 'Description is required' });
   
    default:
      
  }

  try {
    const existingProject = await findProjectByName(project_name);
    if (existingProject) {
      return res.status(409).json({ error: 'Project name already exists' });
    }

    const newProject = await createProject( project_name, description);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};


exports.getAllProjectsController = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProjectsByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProjectController = async (req, res) => {
  const { id } = req.params;
  const { project_name, description } = req.body;

  try {
    const updatedProject = await updateProject(id, project_name, description);
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProjectController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await deleteProject(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



























