var express = require('express');
var router = express.Router();
var async = require('async');
let BoardData = require('../../config/board_dbconfig')
let CommentData = require('../../config/comment_dbconfig')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.get('/:board_id', function (req, res, next) {
    let taskArray = [
        callback=>{
            BoardData.find({_id: req.params.board_id}, (err, board)=>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "board find error"
                    });
                    callback("board find error" + err);
                }
                else{

                    callback(null, board);
                }
            })
        },
        (board, callback) => {
            CommentData.find({board_id : req.params.board_id}, (err,comments) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    console.log(comments)
                    callback(null, board, comments);
                }
            })
        },
        (board, comments, callback) => {
            if(board && comments){
                res.status(200).send({
                    stat:"success",
                    data: {
                        board: board,
                        comments: comments
                    }
                });
                callback("find comments success", null);
            }else{
                res.status(500).send({
                    stat:"fail",
                    msgs:"can't find comments"
                });
                callback("can't find comments");
            }

        }
    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;
