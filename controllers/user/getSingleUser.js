// Import Models
const { User } = require('../../models/Models');

const getSingleUser = async(request, response) => {
    try {
        // Parse User Id from Request Body Params
        const {id} = request.params;
        // Fetch user from Database
        const dbResponse = await User.findById({_id: id}).populate({path: "posts", populate: {path: "likes comments"}}).exec();
        // Handle if there is no user with provided Id
        if(!dbResponse) {
            return response.status(404).json({
                success: false,
                data: "Not found",
                message: `User with the Id - ${id} does not exist`
            })
        }

        // Mask Password
        dbResponse.password = undefined;
        
        // Send Success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: `Fetched user with the id - ${id}`
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

module.exports = getSingleUser;