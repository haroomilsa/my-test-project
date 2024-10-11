const pool = require('../config/db');

const createArticleTable = async()=>{
  
    const createArticleTableQuery =`CREATE TABLE IF NOT EXISTS articles (
         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
         authors_id UUID REFERENCES authors(id) ON DELETE CASCADE,
         title VARCHAR(100) NOT NULL,
         content TEXT
    )`;
    try {
        await pool.query(createArticleTableQuery);
        console.log("articles tables created")
    } catch (error) {
        console.log("error crating articles table",error.message)
    }
};
module.exports={createArticleTable};