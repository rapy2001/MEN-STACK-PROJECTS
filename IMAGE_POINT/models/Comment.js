const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:String,
    userDetails:{
        username:String,
        userId:mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("Comment",commentSchema);