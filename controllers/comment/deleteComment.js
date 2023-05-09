// Import Models
const { Post, Comment } = require('../../models/Models');

const deleteComment = async(request,response) => {
    try {
        // Parse Post and Comment Ids from request params
        const {postId, commentId} = request.params;
        // Delete Comment Document from database
        const dbResponse = await Comment.findByIdAndDelete({_id: commentId});
        // Update Post
        const updatedPost = await Post.findByIdAndUpdate(postId, {$pull: {comments: dbResponse._id}}, {new: true})
                            .populate("comments").exec();
        // Send Success flag
        response.status(200).json({
            success: true,
            data: updatedPost,
            message: "Comment deleted from Database"
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

module.exports = deleteComment;