const router = require('express').Router();
const loginRouter = require('./login.router');

router.use('/login', loginRouter);

module.exports = router;