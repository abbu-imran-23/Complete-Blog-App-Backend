// Import Models
const { Category } = require('../../models/Models');

const categoryPosts = async(request,response) => {
    try {
        // Parse Category type from request params
        const { categoryType } = request.params;
        // Fetch posts from database
        const category = await Category.findOne({category: categoryType})
                        .populate({path: "posts", populate: {path: "likes comments"}}).exec();
        // Handle if there are no posts of given categoryType
        if(!category) {
            return response.status(404).json({
                success: false,
                message: "No posts available of this category"
            })
        }
        // Send posts and success flag
        response.status(200).json({
            success: true,
            data: category,
            message: "Successfully fetched all posts of this category"
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

module.exports = categoryPosts;