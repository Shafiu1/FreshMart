const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
    },
    email:{
        type:String,
        required:[true,'E-mail name is required'],
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);

module.exports=User;