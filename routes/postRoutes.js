const router = require('express').Router();
const validators=require('../middelwares/validators')
const postsController = require('../controllers/postController');

router.post('/', validators.newPostValidator, postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPost);
router.get('/:id/comments', postsController.getPostComments);
router.patch('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;