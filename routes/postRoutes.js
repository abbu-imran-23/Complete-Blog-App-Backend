const express = require('express');
const router = express.Router();

const { createPost, deletePost,
        getSinglePost, updatePost, userPosts } = require('../controllers/Controllers')

router.post('/user/:userId/category/:categoryType/post', createPost);

router.get('/posts/:postId', getSinglePost);

router.get('/user/:userId/posts', userPosts);

router.put('/posts/:postId', updatePost);

router.delete('/posts/:postId', deletePost);

module.exports = router;

