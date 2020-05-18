const router = require('express').Router();
const authController =require('../controllers/authController')
const passport =require('passport')

router.post('/',passport.authenticate('local',{session:false}),authController.login)

module.exports = router;