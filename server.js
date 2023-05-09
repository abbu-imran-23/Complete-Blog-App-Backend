// Instantiating Express
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
// Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Import PORT Number
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running at port - ${PORT}`);
})

// Database Connection
const dbConnect  = require('./config/dbConnect');
dbConnect();

// Mounting Routes
const { userRoutes, postRoutes,
        likeRoutes, commentRoutes,
        categoryRoutes, ProtectedRoutes } = require('./routes/Routes');

app.use('/api', userRoutes, postRoutes,
                likeRoutes, commentRoutes,
                categoryRoutes, ProtectedRoutes);

// Default Route
app.get('/', (req,res) => {
    res.send("<h1>This is Home page</h1>");
})