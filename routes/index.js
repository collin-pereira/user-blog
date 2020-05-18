const router = require('express').Router();

const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes')
const authRoutes = require('./authRoutes')

router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/comment', commentRoutes)
router.use('/auth', authRoutes)

module.exports = router;