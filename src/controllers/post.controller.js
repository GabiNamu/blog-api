const { postService } = require('../services');

const ERROR = 'internal error';

const createNewPost = async (req, res) => {
    try {
        const post = await postService.createNewPost(req.body, req.user);
        if (post.message) return res.status(400).json(post);
        return res.status(201).json(post);
       } catch (err) {
           console.log(err);
           return res.status(500).json({ message: ERROR });
       }
};

const getAllPosts = async (req, res) => {
    try {
        const post = await postService.getAllPosts();
        return res.status(200).json(post);
       } catch (err) {
           console.log(err);
           return res.status(500).json({ message: ERROR });
       }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        if (post.message) return res.status(404).json(post);
        return res.status(200).json(post);
       } catch (err) {
           console.log(err);
           return res.status(500).json({ message: ERROR });
       }
};

const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await postService.updatePostById({ title, content }, id, req.user);
        if (post.message) return res.status(post.status).json({ message: post.message });
        return res.status(200).json(post);
       } catch (err) {
           console.log(err);
           return res.status(500).json({ message: ERROR });
       }
};

const removePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postService.removePostById(id, req.user);
        if (post.message) return res.status(post.status).json({ message: post.message });
        return res.status(204).end();
       } catch (err) {
           console.log(err);
           return res.status(500).json({ message: ERROR });
       }
};

module.exports = {
    createNewPost,
    getAllPosts,
    getPostById,
    updatePostById,
    removePostById,
};