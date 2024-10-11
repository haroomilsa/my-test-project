const pool = require('../config/db');
const{v4:uuidv4} = require('uuid');

const createAuthor = async (author_name) => {
    const newAuthor = await pool.query(
      
  
      'INSERT INTO authors (id,  author_name) VALUES ($1, $2) RETURNING *',
      [uuidv4(),author_name]
    );
    return newAuthor.rows[0];
  };
  module.exports={createAuthor};