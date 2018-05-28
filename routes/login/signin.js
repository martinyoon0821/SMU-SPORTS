var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/dbconfig');
var session = require('express-session');
router.get('/', function (req, res, next) {
    UserData.find({
        email: req.body.email
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                stat: "fail",
                msgs: "find error"
            });
        }
        else {
            if(data[0]) {
                crypto.pbkdf2(req.body.password, data[0].salt, 100000, 64, 'sha512', (err, hashed) => {
                    if (err) {
                        res.status(500).send({
                            stat: "fail",
                            msgs: "hashing fail"
                        });
                    }
                    else {
                        if (hashed.toString('base64') == data[0].password) {
                            req.session.email = data[0].email;
                            console.log(req.session.email);
                            req.session.save();
                            //logout session ㅍㅏ기
                            res.status(201).send({
                                stat: "success",
                                message: "login success"
                            });
                        } else {
                            res.status(500).send({
                                stat: "fail",
                                msgs: "login fail"
                            });
                        }
                    }
                });
            }else{
                res.status(500).send({
                    stat: "fail",
                    msgs: "no such email"
                });
            }
        }
    });
});


module.exports = router;
