const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
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
        }
    }
)

module.exports = mongoose.model("Like", likeSchema);