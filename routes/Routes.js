const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const likeRoutes = require('./likeRoutes');
const commentRoutes = require('./commentRoutes');
const categoryRoutes = require('./categoryRoutes');
const ProtectedRoutes = require('./ProtectedRoutes');

module.exports = {
    userRoutes, postRoutes,
    likeRoutes, commentRoutes,
    categoryRoutes,
    ProtectedRoutes
}


