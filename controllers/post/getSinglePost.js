// Import Models
const { Post } = require('../../models/Models');

const getSinglePost = async(request,response) => {
    try {
        // Parse postId
        const { postId } = request.params;
        // Fetch from database
        const dbResponse = await Post.findById({_id: postId})
                           .populate("likes comments").exec();
        // Handle if there is no post with the given postId
        if(!dbResponse) {
            return response.status(404).json({
                success: false,
                message: "No post available with the given id"
            })
        }
        // Send success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: "Post fetched Successfully"
        })
    } catch (error) {
        // send failure flag
        response.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

module.exports = getSinglePost;