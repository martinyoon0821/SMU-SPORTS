var express = require('express');
let moment = require('moment');
var router = express.Router();
var async = require('async');
let BoardData = require('../../config/board_dbconfig')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.post('/', function (req, res, next) {
    let now = moment();
    let writetime = now.format('YYYY-MM-DD HH:mm:ss');
    let taskArray = [
        (callback) => {
            let item = {
                author: req.session.nickname,
                title: req.body.title,
                content: req.body.content,
                writetime: writetime
            };
            callback(null, item);
        },
        (item, callback) => {
            let data = new BoardData(item);
            data.save((err) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        message: "board writing error"
                    });
                    callback("sign up fail" + err, null);
                } else {
                    res.status(201).send({
                        stat: "success",
                        data: {
                            author: req.session.nickname,
                            title: req.body.title,
                            content: req.body.content,
                            writetime: writetime
                        }
                    });
                    callback("board writing success", null);
                }
            });
        }
    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;
