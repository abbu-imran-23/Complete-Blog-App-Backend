// Import Models
const { User } = require('../../models/Models');

const deleteUser = async(request, response) => {
    try {
        // Parse User Id from Request Body Params
        const {id} = request.params;
        // Fetch user from Database
        const dbResponse = await User.findByIdAndDelete({_id: id});
        // Handle if there is no user with provided Id
        if(!dbResponse) {
            return response.status(404).json({
                success: false,
                data: "Not found",
                message: `User with the Id - ${id} does not exist`
            })
        }
        // Send Success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: `Successfully deleted user with the id - ${id}`
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

module.exports = deleteUser;