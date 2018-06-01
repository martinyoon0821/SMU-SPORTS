var express = require('express');
var router = express.Router();
var async = require('async');
let moment = require('moment');
let BoardData = require('../../config/board_dbconfig')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.put('/:_id', function (req, res, next) {
    let now = moment();
    let writetime = now.format('YYYY-MM-DD HH:mm:ss');
    let taskArray = [
        callback=>{
            BoardData.findOne({_id:req.params._id}, (err, data) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    if(data){
                        callback(null, data);
                    }else{
                        res.status(500).send({
                            stat:"fail",
                            msgs: "no such board exists"
                        });
                        callback("no such board exists" + err);
                    }
                }
            })

        },
        (data,callback)=>{
            BoardData.update({_id:req.params._id}, { $set: req.body},(err, output) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "can't update board error"
                    });
                    callback("can't update board error" + err);
                }
                else{
                    if(!output.n){
                        res.status(500).send({
                            stat:"fail",
                            msgs: "can't find board"
                        });
                        callback("can't find board error");
                    }else {
                        data.writetime = writetime
                        data.save(err=>{
                            if(err){
                                res.status(500).send({
                                    stat:"fail",
                                    msgs: "can't update board"
                                });
                                callback("can't update board error");
                            }else{
                                res.status(200).send({
                                    stat: "success",
                                    msgs: "update board success",
                                    data: {
                                        _id : data._id,
                                        author : data.author,
                                        title : data.title,
                                        content : req.body.content,
                                        writetime: data.writetime
                                    }
                                });
                                callback("update board success", null);
                            }
                        })

                    }
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
