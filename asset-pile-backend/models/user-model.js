const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    }
},{
    timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;