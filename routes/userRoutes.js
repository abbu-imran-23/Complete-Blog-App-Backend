const express = require('express');
const router = express.Router();

const {  register, login,
         getSingleUser, getAllUsers,
        updateUser, deleteUser } = require('../controllers/Controllers');

router.post('/register', register);

router.post('/login', login);

router.get('/users/:id', getSingleUser);

router.get('/users', getAllUsers);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;


