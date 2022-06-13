const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number:{
        type:Number,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
})

const User = mongoose.model('DETAIL',userSchema);

module.exports = User;