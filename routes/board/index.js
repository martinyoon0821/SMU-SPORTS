let express = require('express');
let router = express.Router();
let create = require('./create');
let delet = require('./delete');
let edit = require('./edit');
let show = require('./show');

router.use('/create', create);
router.use('/delete', delet);
router.use('/edit', edit);
router.use('/show', show);



module.exports = router;
