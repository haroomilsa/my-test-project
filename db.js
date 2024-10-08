const { Pool } = require('pg');
require('dotenv').config();



const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const createTables = async () => {
  
  await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');


  try {
    const createUserAuthTableQuery = `CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
    
    )`
      ;
    await pool.query(createUserAuthTableQuery);

    const createProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS Projects (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      
      project_name VARCHAR(100) NOT NULL,
      description TEXT
      
    );
  `;
    await pool.query(createProjectsTableQuery);






    console.log('User Auth table created or already exists.');



  } catch (err) {
    console.error("Error Creating tables ", err.message);
  } 



}
createTables();


process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await pool.end();
  console.log('Database connection closed.');
  process.exit(0);
});


module.exports = pool;




