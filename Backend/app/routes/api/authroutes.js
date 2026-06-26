const express=require('express');
const AuthController = require('../../controller/api/AuthController');
const Auth = require('../../middleware/auth');
const router=express.Router();




router.post('/register',AuthController.register)
router.post('/login',AuthController.login)


// router.use(Auth) // Apply the Auth middleware to all routes below this line

// router.get('/dashboard',AuthController.dashboard)
// router.post('/update-profile',AuthController.updateProfile)





module.exports=router;  