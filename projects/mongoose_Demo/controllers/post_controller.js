const postModel = require('../models/post_model')

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('author','email password');
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Fetching Posts');
    }
}