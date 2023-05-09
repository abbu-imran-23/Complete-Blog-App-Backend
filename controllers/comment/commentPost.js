// Import Models
const { Post, User, Comment } = require('../../models/Models');

const commentPost = async(request,response) => {
    try {
        // Parse User and Category from request params
        const {postId, userId} = request.params;
        // Get username
        const user = await User.findById({_id: userId});
        const username = user.name;
        // Parse Comment from Request Body
        const {commentBody} = request.body;
        // Make Entry in database
        const dbResponse = await Comment.create({
            postId: postId,
            userId: userId,
            username: username,
            commentBody: commentBody
            });
        // Update like in Post
        const updatedPost = await Post.findByIdAndUpdate(postId, {$push: {comments: dbResponse._id}}, {new: true})
                            .populate("comments").exec();
        // Send Success flag
        response.status(200).json({
            success: true,
            data: updatedPost,
            message: "successfully commented on the post"
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

module.exports = commentPost;