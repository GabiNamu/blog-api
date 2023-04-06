const userRouter = require('express').Router();
const { userController } = require('../controllers');
const { authToken } = require('../middlewares/auth.middleware');

userRouter.post('/', userController.createUser);
userRouter.get('/', authToken, userController.getAllUser);

module.exports = userRouter;