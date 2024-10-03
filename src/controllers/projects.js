const pool = require('../../db');
const { v4: uuidv4 } = require('uuid');


exports.createProject = async (req, res) => {
  const { project_name,user_id, description } = req.body;

  // Input validation: Ensure Project NAme and Discription are provided
  if (!project_name || !description) {
    return res.status(400).json({ error: 'project_name and description are required' });
  }

  try {
    // Step 1: Check if the project Name already exists
    const existingProject = await pool.query('SELECT * FROM projects WHERE project_name = $1', [project_name]);

    if (existingProject.rows.length > 0) {
      // Step 2: If email exists, return a 409 Conflict response
      return res.status(409).json({ error: 'Name already exists' });
    }

    // Step 3: Insert the new user if the email doesn't exist
    const newProject = await pool.query(
      'INSERT INTO projects (id,user_id,project_name, description) VALUES ($1, $2,$3,$4) RETURNING *',
      [uuidv4(),user_id,project_name, description]
    );

    // Step 4: Return the created user as a response
    res.status(201).json(newProject.rows[0]);
  } catch (err) {
    // Step 5: Handle any unexpected errors
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};


// GET all users
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await pool.query('SELECT * FROM projects');
    res.status(200).json(projects.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a user by ID
exports.getProjectsById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (project.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a user by ID
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { project_name, description, } = req.body;
  try {
    const updatedProject = await pool.query(
      'UPDATE projects SET project_name = $1, description = $2, WHERE id = $4 RETURNING *',
      [project_name, description, id]
    );
    if (updatedProject.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a user by ID
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    if (deletedProject.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
