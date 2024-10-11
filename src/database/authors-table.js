const pool = require('../config/db');

const createAuthorTable = async()=>{
  
    const createAuthorTableQuery =`CREATE TABLE IF NOT EXISTS authors (

    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(100) NOT NULL
    )`;
    try {
        await pool.query(createAuthorTableQuery);
        console.log("author tables created")
    } catch (error) {
        console.log("error crating author table",error.message)
    }
};
module.exports={createAuthorTable};