// Import Models
const { User } = require('../../models/Models');

const getAllUsers = async(request, response) => {
    try {
        // Fetch all users from Database
        const dbResponse = await User.find({});
        // Handle if there are no users with provided Id
        if(dbResponse.length === 0) {
            return response.status(404).json({
                success: false,
                data: "Not found",
                message: "No user is registered in the database"
            })
        }

        // Mask Passwords
        dbResponse.forEach((user) => {
            user.password = undefined;
        })
        
        // Send Success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: "Fetched all Users from database"
        })
    } catch (error) {
        // Send failure flag
        response.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

module.exports = getAllUsers;