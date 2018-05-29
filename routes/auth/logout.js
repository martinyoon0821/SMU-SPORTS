var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/user_dbconfig');
var session = require('express-session');

router.get('/', function (req, res, next) {
    console.log(req.session.nickname + "!!!");
    if(req.session.nickname){
        req.session.destroy();
        if(req.session){
            res.status(500).send({
                stat:"fail",
                msgs:"cant destroy"
            });
        }else{
            res.status(200).send({
                stat:"success",
                msgs:"logout success"
            })
        }
    }else{
        res.status(500).send({
            stat:"fail",
            msgs:"no session"
        });
    }

});


module.exports = router;
