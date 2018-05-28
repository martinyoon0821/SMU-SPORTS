var express = require('express');
var router = express.Router();
var login = require('./login/index');
var mypage = require('./mypage/index');


router.use('/login', login);
router.use('/mypage', mypage);


module.exports = router;
