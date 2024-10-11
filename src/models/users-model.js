const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createUser = async (name, email, hashedPassword,experience) => {
  
      
  const result = await pool.query(
    'INSERT INTO users (id,name, email, password,experience) VALUES ($1, $2, $3,$4,$5) RETURNING *',

    [uuidv4(),name, email, hashedPassword,experience]
  );
  return result.rows[0];
};


const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getUserExperience = async (id) => {
  const result = await pool.query('SELECT experience FROM users WHERE id = $1', [id]);
  return result.rows[0]?.experience || 0; 
};


const countUserProjects = async (userId) => {
  const result = await pool.query('SELECT COUNT(*) FROM user_projects WHERE user_id = $1', [userId]);
  return parseInt(result.rows[0].count, 10);
};






const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail,findUserById,getUserExperience, countUserProjects, };
