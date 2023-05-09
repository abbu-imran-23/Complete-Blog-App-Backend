const mongoose = require('mongoose');

// Import Database URL
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4
    })
    .then(() => console.log("Database Connection Successful"))
    .catch((error) => {
        console.log("Issue in Database Connection");
        console.log(error);
        process.exit(1);
    })
}

module.exports = dbConnect;