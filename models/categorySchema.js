const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    }
)

module.exports = mongoose.model("Category", categorySchema);