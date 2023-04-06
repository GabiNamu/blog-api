const categoryRouter = require('express').Router();
const { categoryController } = require('../controllers');
const { authToken } = require('../middlewares/auth.middleware');

categoryRouter.post('/', authToken, categoryController.createCategory);

module.exports = categoryRouter;