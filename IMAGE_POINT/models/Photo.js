const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    title:String,
    url:String,
    descritpion:String,
    likes:[mongoose.Schema.Types.ObjectId],
    views:Number,
    userDetails:{
        username:String,
        user_id:mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("Photo",photoSchema);