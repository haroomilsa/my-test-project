const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');


const createProject = async (project_name, description) => {
  const newProject = await pool.query(


    'INSERT INTO Projects (id,  project_name, description) VALUES ($1, $2, $3) RETURNING *',
    [uuidv4(), project_name, description]
  );
  return newProject.rows[0];
};
  const getProjects = async (limit)=> {
  

     await pool.query('SELECT * FROM projects LIMIT $1', [limit]);
    return result.rows;
  
}


const findProjectByName = async (project_name) => {
  const result = await pool.query('SELECT * FROM Projects WHERE project_name = $1', [project_name]);
  return result.rows.length > 0;
};

const getAllProjects = async () => {
  const projects = await pool.query('SELECT * FROM Projects');
  return projects.rows;
};


const getProjectById = async (id) => {
  const project = await pool.query('SELECT * FROM Projects WHERE id = $1', [id]);
  return project.rows[0];
};


const updateProject = async (id, project_name, description) => {
  const updatedProject = await pool.query(
    'UPDATE Projects SET project_name = $1, description = $2 WHERE id = $3 RETURNING *',
    [project_name, description, id]
  );
  return updatedProject.rows[0];
};


const deleteProject = async (id) => {
  const deletedProject = await pool.query('DELETE FROM Projects WHERE id = $1 RETURNING *', [id]);
  return deletedProject.rows[0];
};

module.exports = {
  createProject,
  getProjects,
  findProjectByName,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
