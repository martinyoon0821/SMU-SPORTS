var mongoose = require('mongoose');
var con = mongoose.connect('mongodb://13.125.61.58:27017/ssplus');
var Schema = mongoose.Schema;
var userDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enabled:{
        type: Boolean,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('UserData', userDataSchema);
