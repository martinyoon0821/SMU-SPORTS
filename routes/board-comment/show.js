var express = require('express');
var router = express.Router();
var async = require('async');
let CommentData = require('../../config/comment_dbconfig')

router.get('/:board_id', function (req, res, next) {
    let taskArray = [
        (callback) => {
            console.log(req.session.nickname);
            if(req.session.nickname){
                callback(null);
            }else {
                callback("No session");
                res.status(500).send({
                    stat: "fail"
                });
            }
        },
        (callback) => {
            CommentData.find({board_id : req.params.board_id}, (err,data) =>{
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
