const router = require('express').Router();
const postsController = require('../controllers/postController');

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPost);
router.patch('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;