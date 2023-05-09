const express = require('express');
const router = express.Router();

const { commentPost, deleteComment } = require('../controllers/Controllers');

router.post('/post/:postId/user/:userId/comment', commentPost);

router.delete('/post/:postId/comment/:commentId/delete', deleteComment);

module.exports = router;