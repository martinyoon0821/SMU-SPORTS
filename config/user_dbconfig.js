let mongoose = require('mongoose')
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
