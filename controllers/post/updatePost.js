// Import Models
const { Post } = require('../../models/Models');

const updatePost = async(request,response) => {
    try {
        // Parse PostId from request params
        const { postId } = request.params;
        // Parse post details to be updated from request body
        const { title, body } = request.body;
        // if title and body is empty
        if(!title && !body) {
            return response.status(401).json({
                success: false,
                message: "No changes made to update Post, please enter the details to update post"
            })
        }
        // Update Post details in database
        const dbResponse = await Post.findByIdAndUpdate({_id: postId},
            {
                title: title,
                body: body
            }, {new: true})
        // Handle if there is no post with provided postId
        if(!dbResponse) {
            return response.status(404).json({
                success: false,
                message: "Post you are looking for is not available"
            })
        }
        // Send Success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: "Post updated successfully"
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

module.exports = updatePost;