const userRouter = require('express').Router();
const { userController } = require('../controllers');
const { authToken } = require('../middlewares/auth.middleware');

userRouter.post('/', userController.createUser);
userRouter.get('/', authToken, userController.getAllUser);
userRouter.get('/:id', authToken, userController.getUserById);
userRouter.delete('/me', authToken, userController.removeUser);

module.exports = userRouter;