var express = require('express');
var router = express.Router();
var auth = require('./auth/index');
var user = require('./user/index');



router.use('/auth', auth);
router.use('/user', user);



module.exports = router;
