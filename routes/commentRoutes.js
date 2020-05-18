const router = require('express').Router();
const validators=require('../middelwares/validators')
const commentsController = require('../controllers/commentController');
const passport = require('passport')

router.post('/', passport.authenticate('jwt', { session: false }), validators.newCommentValidator, commentsController.createComment);
router.patch('/:id', [passport.authenticate('jwt', { session: false }), validators.isActionAllowed], commentsController.updateComment);
router.delete('/:id', [passport.authenticate('jwt', { session: false }), validators.isActionAllowed], commentsController.deleteComment);

module.exports = router;