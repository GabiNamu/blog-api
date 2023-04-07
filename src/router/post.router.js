const postRouter = require('express').Router();
const { postController } = require('../controllers');
const { authToken } = require('../middlewares/auth.middleware');

postRouter.post('/', authToken, postController.createNewPost);

module.exports = postRouter;