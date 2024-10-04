const pool = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.signUp= async (req,res)=>{
    const {name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json({ error: 'Name email and password are required' });

    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newSignUp = await pool.query(
            'INSERT INTO peoples (name, email,password) VALUES ($1, $2,$3) RETURNING *',
            [name, email,hashedPassword]
          );
      
          
          res.status(201).json(newSignUp.rows[0]);
    } catch (error) {
         res.status(500).json({error:'Server error:' + error.message})
    }
     
};