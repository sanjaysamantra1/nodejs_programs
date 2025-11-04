const express = require('express');
const { getAllPosts } = require('../controllers/post_controller');
const postRouter = express.Router();

postRouter.get('/', getAllPosts)

module.exports = postRouter;
