const router = require('express').Router();
const usersController = require('../controllers/userController');
const validators = require('../middelwares/validators')
const passport = require('passport')

router.post('/', validators.newUserValidator, usersController.createUser);
router.get('/', passport.authenticate('jwt', { session: false }), usersController.getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), usersController.getUser);
router.patch('/:id', [passport.authenticate('jwt', { session: false }),validators.isActionAllowed], usersController.updateUser);
router.patch('/:id/image', [passport.authenticate('jwt', { session: false }),validators.isActionAllowed], usersController.updateProfileImage);
router.delete('/:id/image', [passport.authenticate('jwt', { session: false }),validators.isActionAllowed], usersController.deleteProfileImage);
router.delete('/:id', [passport.authenticate('jwt', { session: false }),validators.isActionAllowed], usersController.deleteUser);

module.exports = router;