const express = require('express');
const { check, body } = require('express-validator')

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', 
[
check('email')
.isEmail()
.withMessage('Please Enter a valid Email Address')
.custom((value,{req}) => {
    if(value === 'test@test.com'){
        throw new Error('This Email address is forbidden')
    }
    return true
}),
body('password',"Please Enter a valid Password at least 5 characters")
.isLength({min:5,max:17})
.isAlphanumeric(),
body('confirmPassword').custom((value, {req}) => {
    if(value !== req.body.password){
        throw new Error("Your Password should me match!")
    }
    return true
})
]
, authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;