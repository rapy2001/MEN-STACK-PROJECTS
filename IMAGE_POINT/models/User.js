const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    image:String,
    description:String,
    photos:[mongoose.Schema.Types.ObjectId],
    followers:[mongoose.Schema.Types.ObjectId],
    following:[mongoose.Schema.Types.ObjectId],
    notifications:[{
        id:mongoose.Schema.Types.ObjectId,
        viewed:Boolean,
        notifType:Boolean,
        userDetails:{
            username:String,
            userId:mongoose.Schema.Types.ObjectId
        }
    }],
    collections:[mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model("user",userSchema);