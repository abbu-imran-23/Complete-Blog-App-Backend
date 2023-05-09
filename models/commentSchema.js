const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
            type: String,
            required: true
        },
        commentBody: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("Comment", commentSchema);