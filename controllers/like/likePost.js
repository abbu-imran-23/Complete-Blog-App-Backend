// Import Models
const { Post, User, Like } = require('../../models/Models');

const likePost = async(request,response) => {
    try {
        // Parse User and Category from request params
        const {postId, userId} = request.params;
        // Get username
        const user = await User.findById({_id: userId});
        const username = user.name;
        // Make Entry in database
        const dbResponse = await Like.create({
            postId: postId,
            userId: userId,
            username: username
        });
        // Update like in Post
        const updatedPost = await Post.findByIdAndUpdate(postId, {$push: {likes: dbResponse._id}}, {new: true})
                            .populate("likes").exec();
        // Send Success flag
        response.status(200).json({
            success: true,
            data: updatedPost,
            message: "successfully liked post"
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

module.exports = likePost;