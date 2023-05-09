// Protected Routes
const express = require('express');
const router = express.Router();

const { auth, isAdmin } = require('../middlewares/middlewares');

router.get('/admin', auth, isAdmin);

module.exports = router;