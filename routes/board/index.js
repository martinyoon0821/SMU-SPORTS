let express = require('express');
let router = express.Router();
let create = require('./create');
let remove = require('./remove');
let edit = require('./edit');
let show = require('./show');


router.use('/create', create);
router.use('/remove', remove);
router.use('/edit', edit);
router.use('/show', show);




module.exports = router;