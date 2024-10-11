

const pool = require('../config/db');


 const createProjectsTable = async () => {
  const createProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      project_name VARCHAR(100) NOT NULL,
      description TEXT
    );
  `;

  try {
    await pool.query(createProjectsTableQuery);
    console.log('Projects table created or already exists.');
  } catch (err) {
    console.error("Error creating projects table: ", err.message);
  }
};
module.exports={createProjectsTable};