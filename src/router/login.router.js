const loginRouter = require('express').Router();
const { userController } = require('../controllers');

loginRouter.post('/', userController.getUser);

module.exports = loginRouter;