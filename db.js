const { Pool } = require('pg');
require('dotenv').config();  // Load variables from .env file
const { v4: uuidv4 } = require('uuid');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const createTables = async()=>{
  await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  try{
    const createUserTableQuery=`CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL ,
    email VARCHAR(100) UNIQUE NOT NULL
    
    )`
    ;
    await pool.query(createUserTableQuery);

    const createProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      project_name VARCHAR(100) NOT NULL,
      description TEXT
    );
  `;
  await pool.query(createProjectsTableQuery);
  console.log('Projects table created or already exists.');



  }catch(err){
    console.error("error creating tables");
  }

 

}
createTables();

// const getUsersWithProjects = async () => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         u.id AS user_id, 
//         u.name AS user_name, 
//         u.email, 
//         p.id AS project_id, 
//         p.project_name, 
//         p.description 
//       FROM users u
//       LEFT JOIN projects p ON u.id = p.user_id
//     `);
    
//     return result.rows; // Returns the joined results
//   } catch (err) {
//     console.error('Error fetching users with projects:', err.message);
//     throw err; // Optional: re-throw the error for handling in calling function
//   }
// };

// // Call the function to create tables
// createTables().then(async () => {
//   const usersWithProjects = await getUsersWithProjects();
//   console.log(usersWithProjects);

// });

// Export the pool and function if needed
module.exports =pool; 

// {
//   pool,
//   getUsersWithProjects
// };


