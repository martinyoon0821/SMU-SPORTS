var express = require('express');
var router = express.Router();
let auth = require('./auth');
router.use('/auth', auth);

module.exports = router;
