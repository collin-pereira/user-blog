const router = require('express').Router();
const validators = require('../middelwares/validators')
const postsController = require('../controllers/postController');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), validators.newPostValidator, postsController.createPost);
router.get('/', passport.authenticate('jwt', { session: false }), postsController.getAllPosts);
router.get('/:id', passport.authenticate('jwt', { session: false }), postsController.getPost);
router.get('/:id/comments', passport.authenticate('jwt', { session: false }), postsController.getPostComments);
router.patch('/:id', [passport.authenticate('jwt', { session: false }), validators.isActionAllowed], postsController.updatePost);
router.delete('/:id',[passport.authenticate('jwt', { session: false }), validators.isActionAllowed], passport.authenticate('jwt', { session: false }), postsController.deletePost);

module.exports = router;