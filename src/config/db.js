const { Pool } = require('pg');
require('dotenv').config();



const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, 
});



process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await pool.end();
  console.log('Database connection closed.');
  process.exit(0);
});


module.exports = pool;




