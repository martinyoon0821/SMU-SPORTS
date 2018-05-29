let express = require('express');
let router = express.Router();
let create = require('./create');
let remove = require('./remove');
let show = require('./show');
let edit = require('./edit');


router.use('/create', create);
router.use('/remove', remove);
router.use('/show', show);
router.use('/edit', edit);



module.exports = router;
