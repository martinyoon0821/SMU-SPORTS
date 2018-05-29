var express = require('express');
var router = express.Router();
var async = require('async');
let BoardData = require('../../config/board_dbconfig')

router.delete('/:_id', function (req, res, next) {
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
                        callback(null);
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
        (callback) => {
            BoardData.findOneAndRemove({_id:req.params._id}, (err) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "can't remove board"
                    });
                    callback("can't remove board" + err);
                }
                else{
                    res.status(201).send({
                        stat:"success",
                        msgs:"success remove board",
                        data: {
                            _id: req.params._id
                        }
                    });
                    callback("success remove board", null);
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
