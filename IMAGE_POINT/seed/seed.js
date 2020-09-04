const User = require("../models/User");
const Photo = require("../models/Photo");
const Comment = require("../models/Comment");
module.exports = function()
{
    User.deleteMany({})
    .then(()=>{
        console.log("Users deleted");
        Photo.deleteMany({})
        .then(()=>{
            console.log("Photos deleted");
            Comment.deleteMany({})
            .then(()=>{
                console.log("comment deleted successfully");
            })
            .catch((err)=>{
                console.log("Error while deleting the comments");
            })
        })
        .catch((err)=>{
            console.log("Error while deleting the photos");
        })
    })
    .catch((err)=>{
        console.log("Error while deleting the users");
    })
}