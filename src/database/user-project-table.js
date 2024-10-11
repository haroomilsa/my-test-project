

const pool = require('../config/db');


 const createUserProjectsTable = async () => {


  const createUserProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS user_projects (
    PRIMARY KEY (user_id, project_id) ,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      project_id UUID REFERENCES projects(id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(createUserProjectsTableQuery);
    console.log('User-Projects table created or already exists.');
  } catch (err) {
    console.error("Error creating user_projects table: ", err.message);
  }
};
module.exports={createUserProjectsTable};