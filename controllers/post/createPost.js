// Import Models
const { Post, User, Category } = require('../../models/Models');

const createPost = async(request,response) => {
    try {
        // Parse User and Category from request params
        const {userId, categoryType} = request.params;
        // Parse User Details from Request Body
        const {title, body} = request.body;
        // Get username
        const user = await User.findById({_id: userId});
        const username = user.name;
        // Make Entry in Database
        const dbResponse = await Post.create({
            userId: userId,
            username: username,
            category: categoryType,
            title: title,
            body: body
            });
        // Update Post created by user in user's Posts Array
        const updateUserPosts = await User.findByIdAndUpdate({_id:userId}, {$push: {posts: dbResponse._id}}, {new: true})
                                .populate("posts").exec();
        // 2nd time
        const isCategoryAlreadyExist = await Category.findOne({category: categoryType});
        if(isCategoryAlreadyExist) {
            // Update in that category's posts array 
            const updateCategory = await Category.findOneAndUpdate({category: categoryType}, {$push: {posts: dbResponse._id}}, {new: true})
        }
        else {
            // Create new category
            const category = await Category.create({
                category: categoryType,
            })
            // Update in category posts array 
            const createAndUpdateCategory = await Category.findOneAndUpdate({category: categoryType}, {$push: {posts: dbResponse._id}}, {new: true});
        }
        // Send Success flag
        response.status(200).json({
            success: true,
            data: dbResponse,
            message: "Post Entry Created in Database"
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

module.exports = createPost;