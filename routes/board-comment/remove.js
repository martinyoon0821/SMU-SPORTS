var express = require('express');
var router = express.Router();
var async = require('async');
let CommentData = require('../../config/comment_dbconfig')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.delete('/:_id', function (req, res, next) {
    let taskArray = [
        callback=>{
            CommentData.findOne({_id:req.params._id}, (err, data) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    if(data){
                        callback(null);
                    }else{
                        res.status(500).send({
                            stat:"fail",
                            msgs: "no such comment exists"
                        });
                        callback("no such comment exists" + err);
                    }
                }
            })
        },
        (callback) => {
            CommentData.findOneAndRemove({_id:req.params._id}, (err) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "can't remove comment"
                    });
                    callback("can't remove comment" + err);
                }
                else{
                    res.status(201).send({
                        stat:"success",
                        msgs:"success remove comment",
                        data: {
                            _id: req.params._id
                        }
                    });
                    callback("success remove comment", null);
                }
            })
        }
    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;
