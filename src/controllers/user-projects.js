
const UserProjects = require('../models/user-projects-model');
const {assignProject} = require('../models/user-projects-model');
const {getUserExperience,countUserProjects} = require('../models/users-model')
const pool = require('../config/db');

const assignProjectToUser = async (req, res) => {
  const { userId, projectId } = req.body;

  try {

    const experience = await getUserExperience(userId);
    const projectCount = await countUserProjects(userId);

console.log(experience,'exp');

    let maxProjects;
    switch (experience) {
      case 'one_year':
        maxProjects = 1;
        break;
      case 'two_years':
        maxProjects = 2;
        break;
      case 'three_years':
        maxProjects = 3;
        break;
      default:
        return res.status(400).json({ error: 'Invalid experience level' });
    }


    if (projectCount >= maxProjects) {
      return res.status(400).json({
        error: `User with ${experience} experience cannot be assigned more than ${maxProjects} projects`,
      });
    }

    await assignProject(userId, projectId);
    res.status(200).json({ message: 'Project assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

















const getUserProjects = async (req, res) => {
    const { userId } = req.params;
    try {
        const projects = await UserProjects.getUserProjects(userId);
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user projects' });
    }
};

const deleteUserProject = async (req, res) => {
    const { userId, projectId } = req.params;
    try {
        const deletedProject = await UserProjects.deleteUserProject(userId, projectId);
        res.status(200).json(deletedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user project' });
    }
};

module.exports = {
    
    getUserProjects,
    deleteUserProject,
    assignProjectToUser,
};
