var express = require('express');
var router = express.Router();
var auth = require('./auth/index');
var user = require('./user/index');
var board = require('./board/index');
let comment = require('./board-comment/index');

router.use('/auth', auth);
router.use('/user', user);
router.use('/board', board);
router.use('/board-comment', comment);

module.exports = router;
