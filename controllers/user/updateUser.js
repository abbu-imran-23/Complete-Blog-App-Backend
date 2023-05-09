// Import Models
const { User } = require('../../models/Models');

const updateUser = async(request, response) => {
    try {
        // Parse User Id from Request Body Params
        const {id} = request.params;
        // Parse User Details from Request Body
        const {name, email, password, about} = request.body;
        // Fetch user from Database
        const dbResponse = await User.findByIdAndUpdate(id, {name, email, password, about})
        // Handle if there is no user with provided Id
        if(!dbResponse) {
            return response.status(404).json({
                success: false,
                data: "Not found",
                message: `User with the Id - ${id} does not exist`
            })
        }
        const updatedUserDetails = await User.findById({_id: id});

        // Mask Password
        updatedUserDetails.password = undefined;

        // Send Success flag
        response.status(200).json({
            success: true,
            data: updatedUserDetails,
            message: `Updated user with the id - ${id}`
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

module.exports = updateUser;