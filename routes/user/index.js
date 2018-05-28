var express = require('express');
var router = express.Router();
var info = require('./info');

router.use('/info', info);




module.exports = router;
