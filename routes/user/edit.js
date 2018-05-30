var express = require('express');
var router = express.Router();
let async = require('async');
var UserData = require('../../config/user_dbconfig');
let BoardData = require('../../config/board_dbconfig');
let CommentData = require('../../config/comment_dbconfig');
router.put('/', function (req, res, next) {

    var taskArray = [
        (callback) =>{
            console.log(req.session.nickname);
            if(req.session.nickname){
                callback(null);
            }else{
                callback("no session");
                res.status(500).send({
                    stat : "fail",
                    msgs : "no session"
                });
            }
        },
        (callback) => {
            UserData.find({nickname : req.session.nickname}, (err,data)=>{
                if(err){
                    res.status(500).send({
                        stat: "fail",
                        msgs: "find error"
                    });
                    callback(err);
                }else{
                    if(data){
                       callback(null);
                    }else{
                        res.status(500).send({
                            stat: "fail",
                            msgs: "user find error"
                        });
                        callback("can't find user")
                    }
                }
            })
        },
        (callback) =>{
            UserData.update({nickname:req.session.nickname}, { $set: req.body}, (err, output)=>{
                if(err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "can't update user error"
                    });
                    callback("can't update user error" + err);
                }else{
                    if(!output.n){
                        res.status(500).send({
                            stat:"fail",
                            msgs: "can't find user error"
                        });
                        callback("can't find user error");
                    }else {
                        if(req.session.nickname == req.body.nickname) {
                            res.status(200).send({
                                stat: "success",
                                msgs: "update user success"
                            });
                            callback("update user success", null);
                        }else{
                            callback(null);
                        }
                    }
                }
            })
        },
        (callback) =>{
            BoardData.find({author: req.session.nickname}, (err, data) =>{
                if(err){
                    res.status(500).send({
                        stat: "fail",
                        msgs: "find error"
                    });
                    callback(err);
                }else{
                    if(data.length > 0){
                        for(let i =0; i< data.length; i++){
                            data[i].author = req.body.nickname
                            data[i].save(err=>{
                                if(err){
                                    res.status(500).send({
                                        stat: "fail",
                                        msgs: "can't change board author"
                                    });
                                    callback(err);
                                }
                            })

                        }
                        callback(null)
                    }else{
                        callback(null)
                    }
                }
            });
        },
        (callback) =>{
            CommentData.find({author: req.session.nickname}, (err, data) => {
                if(err){
                    res.status(500).send({
                        stat: "fail",
                        msgs: "find error"
                    });
                    callback(err);
                }else{
                    if(data.length > 0){
                        for(let i =0; i< data.length; i++){
                            data[i].author = req.body.nickname
                            data[i].save(err=>{
                                if(err){
                                    res.status(500).send({
                                        stat: "fail",
                                        msgs: "can't change comment author"
                                    });
                                    callback(err);
                                }
                            })
                        }
                        callback(null)
                    }else{
                        callback(null)
                    }
                }
            })
        },
        (callback) => {
            req.session.nickname = req.body.nickname;
            console.log(req.session.nickname);
            req.session.save();
            res.status(200).send({
                stat: "success",
                msgs: "update user success"
            });
            callback("update user success", null);
        }

    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});


module.exports = router;
