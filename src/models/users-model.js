const pool = require('../../db');
const { v4: uuidv4 } = require('uuid');

const createUser = async (name, email, hashedPassword) => {
  
      
  const result = await pool.query(
    'INSERT INTO users (id,name, email, password) VALUES ($1, $2, $3,$4) RETURNING *',

    [uuidv4(),name, email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };