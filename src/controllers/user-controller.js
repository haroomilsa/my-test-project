const pool = require('../../db');
const { v4: uuidv4 } = require('uuid');


exports.createUser = async (req, res) => {
  const { name, email } = req.body;


  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (id,name, email) VALUES ($1, $2,$3) RETURNING *',
      [uuidv4(),name, email]
    );

    
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.status(200).json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [name, email, age, id]
    );
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
