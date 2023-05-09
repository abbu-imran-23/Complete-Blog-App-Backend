const express = require('express');
const router = express.Router();

const { categoryPosts } = require('../controllers/Controllers');

router.get('/category/:categoryType/posts', categoryPosts);

module.exports = router;