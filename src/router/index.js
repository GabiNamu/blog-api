const router = require('express').Router();
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;