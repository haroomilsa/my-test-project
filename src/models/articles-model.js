const pool = require('../config/db');
const{v4:uuidv4} = require('uuid');

const createArticle = async ( authors_id,title,content) => {
    const newArticle = await pool.query(
      
  
      'INSERT INTO articles (id,authors_id,title,content) VALUES ($1, $2,$3,$4) RETURNING *',
      [uuidv4(),authors_id,title,content]
    );
    return newArticle.rows[0];
  };
  module.exports={createArticle};