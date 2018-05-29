var express = require('express');
var router = express.Router();
var info = require('./info');
let edit = require('./edit')
router.use('/info', info);
router.use('/edit', edit);




module.exports = router;
