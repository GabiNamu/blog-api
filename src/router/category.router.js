const categoryRouter = require('express').Router();
const { categoryController } = require('../controllers');
const { authToken } = require('../middlewares/auth.middleware');

categoryRouter.post('/', authToken, categoryController.createCategory);
categoryRouter.get('/', authToken, categoryController.getAllCategories);

module.exports = categoryRouter;