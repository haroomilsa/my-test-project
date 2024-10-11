const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')
const { createUser, findUserByEmail } = require('../models/users-model.js');
require('dotenv').config();


 const register = async (req, res) => {
  const { name, email, password,experience} = req.body;
  switch (true) {
    case !name:
      return res.status(400).json({ error: 'Name is required' });
    case !email:
      return res.status(400).json({ error: 'Email is required' });
    case !password:
      return res.status(400).json({ error: 'Password is required' });
      
    default:
      
  }
  
  const formattedEmail = email.trim().toLowerCase(); 
  if (!validator.isEmail(formattedEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const isPasswordStrong = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

if (!isPasswordStrong(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character',
    });
  }

  
  try {
    const existingUser = await findUserByEmail(formattedEmail);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, formattedEmail, hashedPassword,experience);
 

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const formattedEmail = email.trim().toLowerCase(); 

  try {
    const user = await findUserByEmail(formattedEmail);
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Logged in', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};









module.exports = { register, login};
