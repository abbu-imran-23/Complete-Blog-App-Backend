// User Controllers
const register = require('./user/register');
const login = require('./user/login');
const getSingleUser = require('./user/getSingleUser');
const getAllUsers = require('./user/getAllUsers');
const updateUser = require('./user/updateUser');
const deleteUser = require('./user/deleteUser');

// Post Controllers
const createPost = require('./post/createPost');
const deletePost = require('./post/deletePost');
const getSinglePost = require('./post/getSinglePost');
const updatePost = require('./post/updatePost');
const userPosts = require('./post/userPosts');

// Like Controllers
const likePost = require('./like/likePost');
const unlikePost = require('./like/unlikePost');

// Comment Controllers
const commentPost = require('./comment/commentPost');
const deleteComment = require('./comment/deleteComment');

// Category Controllers
const categoryPosts = require('./category/categoryPosts');

module.exports = {
    register, login, getSingleUser, getAllUsers, updateUser, deleteUser,
    createPost, deletePost, getSinglePost, updatePost, userPosts,
    likePost, unlikePost,
    commentPost, deleteComment,
    categoryPosts
}