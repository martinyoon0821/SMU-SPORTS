var express = require('express');
var router = express.Router();
let async = require('async');
var UserData = require('../../config/user_dbconfig');
router.get('/', function (req, res, next) {
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
                        res.status(200).send({
                            stat:"success",
                            msgs:"user find success",
                            data : {
                                name : data[0].name,
                                email : data[0].email,
                                nickname : data[0].nickname
                            }
                        })
                    }else{
                        res.status(500).send({
                            stat: "fail",
                            msgs: "user find error"
                        });
                        callback("can't find user")
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