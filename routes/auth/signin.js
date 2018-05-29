var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/user_dbconfig');
var async = require('async');
router.post('/', function (req, res, next) { //1
    let taskArray =[
        (callback)=>{
            UserData.find({
                email:req.body.email
            }, (err, data)=>{
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
            });
        },
        (data, callback)=>{
            if(data[0]){
                crypto.pbkdf2(req.body.password, data[0].salt, 100000, 64, 'sha512', (err, hashed) =>{
                    if(err){
                        res.status(500).send({
                            stat:"fail",
                            msgs: "hashing fail"
                        });
                        callback("hashing fail" + err);
                    }else{
                        callback(null, hashed, data);
                    }
                });
            }else{
                res.status(500).send({
                    stat:"fail",
                    msgs: "no such email"
                });
                callback("no such email");
            }
        },
        (hashed, data, callback)=>{
            if(hashed.toString('base64') == data[0].password){
                req.session.nickname = data[0].nickname;
                console.log(req.session.nickname);
                req.session.save();
                //logout session ㅍㅏ기
                res.status(201).send({
                    stat: "success",
                    msgs: "login success"
                });
                callback("login success", null);
            }
            else{
                res.status(500).send({
                    stat:"fail",
                    msgs: "login fail"
                });
                callback("login fail", null);
            }
        }
    ];

    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });
});


module.exports = router;
