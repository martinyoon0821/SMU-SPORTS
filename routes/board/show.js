var express = require('express');
var router = express.Router();
var async = require('async');
let BoardData = require('../../config/board_dbconfig')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.get('/', function (req, res, next) {
    let taskArray = [
        (callback) => {
            BoardData.find({}, (err,data) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    callback(null, data);
                }
            })
        },
        (data, callback) => {
            if(data){
                res.status(200).send({
                    stat:"success",
                    data: data
                });
                callback("find boards success", null);
            }else{
                res.status(500).send({
                    stat:"fail",
                    msgs:"can't find boards"
                });
                callback("can't find boards");
            }

        }
    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;
