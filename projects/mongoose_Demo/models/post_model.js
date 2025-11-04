const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User" 
    },
    tags: { type: String, required: true },
    Likes: { type: Number, required: true }
})

postSchema.pre('save', async function (next) {
    const post = this;
    post.password = btoa(post.password)
    next();
});

let postModel = mongoose.model("Post", postSchema);
module.exports = postModel;