const router = require('express').Router();
const usersController = require('../controllers/userController');
const validators = require('../middelwares/validators')

router.post('/',validators.newUserValidator,usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;