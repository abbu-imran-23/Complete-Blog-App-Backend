// Import Models
const { User } = require('../../models/Models');

const userPosts = async(request,response) => {
    try {
        // Parse userId from request body
        const { userId } = request.params;
        // fetch posts of users
        const userDetails = await User.findById({_id: userId})
                            .populate({path: "posts", populate: {path: "likes comments"}}).exec();
        // Handle if there is no user with the given userId
        if(!userDetails) {
            return response.status(404).json({
                success: false,
                message: "No user available with the given id"
            })
        }
        // Get posts from usrDetails send success flag
        const posts = userDetails.posts;
        // Handle if there are no posts of that user
        if(posts.length === 0) {
            return response.status(404).json({
                success: false,
                message: "No posts available for that user"
            })
        }
        response.status(200).json({
            success: true,
            data: posts,
            message: "Fetched all posts of user"
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

module.exports = userPosts;