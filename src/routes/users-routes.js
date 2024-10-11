const express = require('express');
const  userAuthController = require('../controllers/users');
const authMiddleware = require('../middlewares/users-middleware.js');

const router = express.Router();


router.post('/api/register', userAuthController.register);
router.post('/api/login',userAuthController.login);
router.get('/api/profile',authMiddleware,(req,res)=>{
    res.send(`user profile for user id ${req.user}`)
})

module.exports = router;