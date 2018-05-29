var express = require('express');
var router = express.Router();
var auth = require('./auth/index');
var user = require('./user/index');
var board = require('./board/index');


router.use('/auth', auth);
router.use('/user', user);
router.use('/board', board);


module.exports = router;
