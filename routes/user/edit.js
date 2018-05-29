var express = require('express');
var router = express.Router();
let async = require('async');
var UserData = require('../../config/user_dbconfig');
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
        callback =>{
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
                        res.status(200).send({
                            stat: "success",
                            msgs: "update user success"
                        });
                        callback("update user success", null);
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
