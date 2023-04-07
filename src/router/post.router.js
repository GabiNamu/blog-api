const postRouter = require('express').Router();
const { postController } = require('../controllers');
const { authToken } = require('../middlewares/auth.middleware');

postRouter.post('/', authToken, postController.createNewPost);
postRouter.get('/', authToken, postController.getAllPosts);
postRouter.get('/:id', authToken, postController.getPostById);
postRouter.put('/:id', authToken, postController.updatePostById);

module.exports = postRouter;