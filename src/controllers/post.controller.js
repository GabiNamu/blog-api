const { postService } = require('../services');

const createNewPost = async (req, res) => {
    try {
        const post = await postService.createNewPost(req.body, req.user);
        console.log(post);
        if (post.message) return res.status(400).json(post);
        return res.status(201).json(post);
       } catch (err) {
           console.log(err);
           return res.status(500).json({ message: 'internal error' });
       }
};

module.exports = {
    createNewPost,
};