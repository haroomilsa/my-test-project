const express = require('express');
const  userAuthController = require('../controllers/users');
const authMiddleware = require('../middlewares/users-middlewre');

const router = express.Router();


router.post('/register', userAuthController.register);
router.post('/login',userAuthController.login);
router.get('/profile',authMiddleware,(req,res)=>{
    res.send(`user profile for user id ${req.user}`)
})

module.exports = router;