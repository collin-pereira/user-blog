const router = require('express').Router();
const validators=require('../middelwares/validators')
const commentsController = require('../controllers/commentController');

router.post('/', validators.newCommentValidator, commentsController.createComment);
router.patch('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;