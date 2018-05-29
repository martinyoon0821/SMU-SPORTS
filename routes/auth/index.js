var express = require('express');
var router = express.Router();
var signin = require('./signin');
var signup = require('./signup');
var logout = require('./logout');


router.use('/signin', signin);
router.use('/signup', signup);
router.use('/logout', logout);



module.exports = router;
