

const pool = require('../config/db');


  const createUsersTable = async () => {
  const createUserAuthTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      experience VARCHAR(100) NOT NULL
    );
  `;

  try {
    await pool.query(createUserAuthTableQuery);
    console.log('Users table created or already exists.');
  } catch (err) {
    console.error("Error creating users table: ", err.message);
  }
};
module.exports={createUsersTable};

