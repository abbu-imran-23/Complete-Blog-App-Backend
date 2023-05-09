// Import Models
const { Post, User, Category } = require('../../models/Models');

const deletePost = async(request,response) => {
    try {
        // Parse PostId to be deleted from request params
        const { postId } = request.params;
        // Delete from database
        const dbResponse = await Post.findByIdAndDelete({_id: postId});
        // Handle if there is no post with given postId
        if(!dbResponse) {
            return response.status(404).json({
                success: false,
                message: 'Post not available'
            })
        }
        // Delete post from user's post list
        const updatedUserPosts = await User.findByIdAndUpdate({_id: dbResponse.userId},
            {$pull: {posts: postId}}, {new: true});
        // Delete post from category list
        const updatedCategoryPosts = await Category.findOneAndUpdate({category: dbResponse.category},
            {$pull: {posts: postId}}, {new: true});
        // send success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: "Post deleted successfully"
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

module.exports = deletePost;
