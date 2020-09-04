const User = require("../models/User");
const Photo = require("../models/Photo");
module.exports = function()
{
    User.deleteMany({})
    .then(()=>{
        console.log("Users deleted");
        Photo.deleteMany({})
        .then(()=>{
            console.log("Photos deleted");
        })
        .catch((err)=>{
            console.log("Error while deleting the photos");
        })
    })
    .catch((err)=>{
        console.log("Error while deleting the users");
    })
}