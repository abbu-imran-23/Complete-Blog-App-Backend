const express = require('express');
const router = express.Router();

const { likePost, unlikePost } = require('../controllers/Controllers');

router.post('/post/:postId/user/:userId/like', likePost);

router.delete('/post/:postId/like/:likeId/unlike', unlikePost);

module.exports = router;