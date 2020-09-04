const express = require("express");
const mongoose  = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/node_photo_point",{ useNewUrlParser: true , useUnifiedTopology: true});
const app = express();
const cors = require("cors");
const handlebars = require("express3-handlebars").create({defaultLayout:"main"});
app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.use(express.static(__dirname + "/public"));
app.set("PORT",process.env.PORT || 3000);
app.use(require("cookie-parser")("my secret string"));
app.use(require("express-session")({
    secret:"secret string",
    resave:true,
    saveUninitialized:true
}));
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const formidable = require("formidable");
//routes
const User = require("./models/User");
const Photo = require("./models/Photo");
const bodyparser = require("body-parser");
const seed = require("./seed/seed");
seed();
const messages = require("./Messages");
app.use(bodyparser.urlencoded({extended:true}));


app.use(function(req,res,next){
    if(req.session.msg === null)
        res.locals.msg = undefined;
    else
        res.locals.msg = req.session.msg;
    req.session.msg = null
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.crntUser = req.session.crntUser;
    next();
});

app.get("/",function(req,res){
    req.session.hello = "hello";
    res.render("homepage");
});
app.get("/user/register",function(req,res){
    res.render("register");
});

app.post("/user/register",function(req,res){
    User.find({},function(err,users){
        if(err)
        {
            console.log("Error while getting the users");
            req.session.msg = messages.serverError
            res.redirect(303,"/user/register");
        }
        else
        {
            let flg = 1;
            for(let i = 0; i<users.length; i++)
            {
                if(users[i].username === req.body.username)
                {
                    flg = 0;
                    req.session.msg = {
                        type:false,
                        text:"Username already exists. Please enter a different username"
                    }
                    res.redirect(303,"/user/register");
                    break;
                }
            }
            if(flg === 1)
            {
                // console.log(req.body);
                const form = new formidable.IncomingForm();
                form.parse(req,function(err,fields, files){
                    if(err)
                    {
                        console.log("failed to parse the request object");
                        req.session.msg = {
                            type:false,
                            text:"Username already exists. Please enter a different username"
                        }
                        res.redirect(303,"/user/register");
                    }
                    else
                    {
                        bcrypt.hash(fields.password, saltRounds,function(err,hash){
                            if(err)
                            {
                                console.log("error while hashing the password");
                                req.session.msg = messages.serverError
                                res.redirect(303,"/user/register");
                            }
                            else
                            {
                                // console.log(fields,files);
                                User.create({
                                    username:fields.username,
                                    password:hash,
                                    image:"",
                                    description:fields.description,
                                    followers:[],
                                    following:[],
                                    notifications:[],
                                    collections:[]
                                })
                                .then((user)=>{
                                    if(files.user_image.name !== "")
                                    {
                                        let ary = files.user_image.name.split(".");
                                        let val = Date.now();
                                        let pathname = __dirname + "/public/UPLOADS/" + user.username + val + "." +ary[ary.length - 1];
                                        console.log(files.user_image.name, files.user_image.path);
                                        fs.renameSync(files.user_image.path,pathname);
                                        user.image = "UPLOADS/" + user.username + val + "." +ary[ary.length - 1];
                                    }
                                    user.save()
                                    .then(()=>{
                                        req.session.msg = {
                                            type:true,
                                            text:"User Registartion successfull"
                                        }
                                        res.redirect("/");
                                    })
                                    .catch((err)=>{
                                        console.log("error while saving the user profile pic path");
                                        req.session.msg = messages.serverError;
                                        res.redirect(303,"/user/register");
                                    })               
                                            
                                })
                                .catch((err)=>{
                                    console.log("error while creating the user during user registartion");
                                    req.session.msg = messages.serverError;
                                    res.redirect(303,"/user/register");
                                })
                            }
                        });
                    }
                })
                
            }
        }
    })
    
});

app.get("/user/login",function(req,res){
    res.render("login");
});

app.post("/user/login",function(req,res){
    // console.log(req.body);

    User.find({username:req.body.username},function(err,users){
        if(err)
        {
            req.session.msg = {
                type:false,
                text:"Username does not exists. Please Register"
            }
            res.redirect(303,"/user/register");
        }
        else
        {
            // console.log(user);
            if(bcrypt.compareSync(req.body.password,users[0].password))
                {
                    req.session.isLoggedIn = true;
                    req.session.crntUser = {
                        username:users[0].username,
                        ID:users[0]._id
                    }
                    req.session.msg = {
                        type:true,
                        text:"Log In. Successful"
                    }
                    res.redirect("/");
                }
                else
                {
                    req.session.msg = {
                        type:false,
                        text:"Password is wrong. Please try again"
                    }
                    res.redirect(303,"/user/login");
                }
        }
    })
});

app.get("/user/logout",(req,res,next) =>{if(req.session.isLoggedIn === true) return next(); else res.redirect("/")},function(req,res){
    req.session.isLoggedIn = false;
    req.session.crntUser = {};
    req.session.msg = {
        type:true,
        msg:"You have logged out successfully"
    }
    res.redirect("back");
});

// app.get("/secret",check,function(req,res){
//     res.send("secret page");
// })

app.get("/photos/create",check,function(req,res){
    res.render("photoCreate");
});

app.post("/photos/create",check,function(req,res){
    User.findById(req.session.crntUser.ID,function(err,user){
        if(err)
        {
            console.log("error while getting the user for creating the photos");
            req.session.msg = messages.serverError
            res.redirect("/photos/create");
        }
        else
        {
            const form = new formidable.IncomingForm();
            form.parse(req,function(err, fields, files){
                if(err)
                {
                    console.log("error while parsing the form");
                    req.session.msg = messages.serverError
                    res.redirect("/photos/create");
                }
                else
                {
                    let pathname = "";
                    if(files.photo.name !== "")
                    {
                        let ary = files.photo.name.split(".");
                        let val = Date.now();
                        pathname = __dirname + "/public/UPLOADS/PHOTOS/" + user.username + "_" + val + "." + ary[ary.length - 1];
                        fs.renameSync(files.photo.path,pathname);
                        let url = "/UPLOADS/PHOTOS/" + user.username + "_" + val + "." + ary[ary.length - 1];
                        Photo.create({
                            title:fields.title,
                            url:url,
                            description:fields.description,
                            likes:[],
                            views:0,
                            userDetails:{
                                username:user.username,
                                user_id:user._id
                            }
                        },function(err,photo){
                            if(err)
                            {
                                console.log("Error while creating the photo");
                                req.session.msg = messages.serverError;
                                res.redirect("/photos/create");
                            }
                            else
                            {
                                user.photos.push(photo._id);
                                user.save()
                                .then(()=>{
                                    if(user.followers.length > 0)
                                    {
                                        let i = 0;
                                        for(i = 0; i<user.followers.length; i++)
                                        {
                                            User.findById(user.followers[i],function(err,follower){
                                                if(err)
                                                {
                                                    console.log("error while finding one of the followers");
                                                    req.session.msg = messages.serverError;
                                                    res.redirect("/");
                                                }
                                                else
                                                {
                                                    follower.notifications.push({
                                                        notificatonId:Number(Date.now()),
                                                        id:photo._id,
                                                        viewed:false,
                                                        notifType:false,
                                                        userDetails:{
                                                            username:user.username,
                                                            userId:user._id
                                                        }
                                                    });
                                                    follower.save(function(err){
                                                        if(err)
                                                        {
                                                            console.log("Error while giving the notifications to the follower");
                                                            req.session.msg = messages.serverError;
                                                            res.redirect("/");
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                        if(i>user.followers.length)
                                        {
                                            req.session.msg = {
                                                type:true,
                                                text:"Photo added successfully"
                                            }
                                            res.redirect("/");
                                        }
                                    }
                                    else
                                    {
                                        req.session.msg = {
                                            type:true,
                                            text:"Photo added successfully"
                                        }
                                        res.redirect("/");
                                    }
                                    
                                })
                                .catch((err)=>{
                                    console.log("Error while saving the photo id to user");
                                    req.session.msg = messages.serverError;
                                    res.redirect("/photos/create");
                                })
                            }
                        })
                    }
                    else
                    {
                        req.session.msg = {
                            type:false,
                            text:"Please upload an image only"
                        }
                        res.redirect(303,"/photos/create");
                    }
                    
                }
            })
        }
    })
    
});

app.get("/photos/show",function(req,res){
    Photo.find({},function(err,photos){
        if(err)
        {
            console.log("Error while finding all the photos");
            req.session.msg = messages.serverError;
            res.redirect("/");
        }
        else
        {
            let newPhotos = photos.map((photo)=>{
                return {
                    id:photo._id,
                    title:photo.title,
                    url:photo.url,
                    descritpion:photo.description,
                    likes:photo.likes.length,
                    views:photo.views,
                    userDetails:photo.userDetails
                }
            })
            res.render("photosAll",{photos:newPhotos});
        }
    });
});

app.get("/photo/:id/show",function(req,res){
    Photo.findById(req.params.id,function(err,photo){
       if(err)
       {
           console.log("Error while finding the photo");
           req.session.msg = messages.serverError;
           res.redirect("back");
       } 
       else
       {
           photo.views +=1;
           photo.save(function(err,photo){
               if(err)
               {
                    console.log("Error while saving the photo for view update");
                    req.session.msg = messages.serverError;
                    res.redirect("back");
               }
               else
               {
                let like = true;
                let val = 0;
                if(req.session.isLoggedIn)
                {
                    for(let i = 0; i<photo.likes.length; i++)
                    {
                        if(String(photo.likes[i]) === String(req.session.crntUser.ID))
                        {
                            val = -1;
                            break;
                        }
                    }
                    if(val == -1)
                        like = false;
                    let follow = true;
                    let collection = true;
                    User.findById(photo.userDetails.user_id)
                    .then((user)=>{
                        if(user.followers.length > 0)
                        {
                            for(let i = 0; i<user.followers.length; i++)
                            {
                                if(String(req.session.crntUser.ID) === String(user.followers[i]))
                                {
                                    follow = false;
                                    break;
                                }
                            }
                        }
                        if(user.collections.length > 0)
                        {
                            for(let i = 0; i<user.collections.length; i++)
                            {
                                if(String(photo._id) === String(user.collections[i]))
                                {
                                    follow = false;
                                    break;
                                }
                            }
                        }
                        let newPhoto = {
                            id:photo._id,
                            title:photo.title,
                            url:photo.url,
                            descritpion:photo.description,
                            likes:photo.likes.length,
                            views:photo.views,
                            userDetails:photo.userDetails,
                            like:like,
                            follow:follow,
                            collecton:collection
                        }
                        res.render("photoShow",{photo:newPhoto});
                        
                        
                    })
                    .catch((err)=>{
                        console.log("Error while getting the user during photo show");
                        req.session.msg = messages.serverError;
                        res.redirect("back");
                    })
                }
               }
           })
       }
    });
});


app.get("/photo/:id/like",check,function(req,res){
    if(req.session.isLoggedIn)
    {
        Photo.findById(req.params.id,function(err,photo){
            if(err)
            {
                console.log("Error while finding the photo for adding the like");
                req.session.msg = messages.serverError;
                res.redirect("/photo/"+req.params.id+"/show");
            }
            else
            {
                photo.likes.push(req.session.crntUser.ID);
                photo.save(function(err){
                    if(err)
                    {
                        console.log("Error while adding the like to the photo");
                        req.session.msg = messages.serverError;
                        res.redirect("/photo/"+req.params.id+"/show");
                    }
                    else
                    {  
                        req.session.msg = {
                            type:true,
                            text:"Like added successfully"
                        }
                        res.redirect("/photo/"+req.params.id+"/show");
                    }
                })
            }
        });
    }
    else
    {
        req.session.msg = messages.logErr;
        res.redirect("back");
    }
});
app.get("/user/:id/dashboard",check,dash,function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err)
        {
            console.log("Error while getting the user data");
            req.session.msg = messages.serverError;
            res.redirect("/");
        }
        else
        {
            let ary = [];
            for(let i = 0; i<user.notifications.length; i++)
            {
                if(user.notifications[i].viewed)
                    ary.push(i);
            }
            for(let i = 0; i<ary.length; i++)
            {
                user.notifications.splice(ary[i],1);
            }
            user.save(function(err,user){
                if(err)
                {
                    console.log("Error while removing the viewed notifications");
                    req.session.msg = messages.serverError;
                    res.redirect("/");
                }
                else
                {
                    let data = {
                        username:user.username,
                        image:user.image,
                        photos:user.photos.length,
                        followers:user.followers.length,
                        notifications:user.notifications
                    }
                    res.render("dashboard",{data:data});
                }
            })
            
        }
    });  
});

app.get("/user/:id/follow",check,function(req,res){
    if(req.session.isLoggedIn)
    {
        User.findById(req.params.id,function(err,user){
            if(err)
            {
                console.log("Error while finding the user for following");
                req.session.msg = messages.serverError;
                res.redirect("back");
            }
            else
            {
                user.followers.push(req.session.crntUser.ID);
                user.save(function(err,user){
                    if(err)
                    {
                        console.log("Error while saving the user for following");
                        req.session.msg = messages.serverError;
                        res.redirect("back");
                    }
                    else
                    {
                        User.findById(req.session.crntUser.ID)
                        .then((user)=>{
                            user.following.push(req.params.id);
                            user.save(function(err){
                                if(err)
                                {
                                    console.log("Error while saving the user who is following");
                                    req.session.msg = messages.serverError;
                                    res.redirect("back");
                                }
                                else
                                {
                                    req.session.msg = {
                                        type:true,
                                        text:"Now following"
                                    }
                                    res.redirect("back");
                                }
                            })
                        })
                        .catch((err)=>{
                            console.log("Error while finding  the user who is going to follow");
                            req.session.msg = messages.serverError;
                            res.redirect("back");
                        })
                    }
                })
            }
        });
    }
    else
    {
        req.session.msg = messages.logErr;
        res.redirect("back");
    }
    
});


app.get("/notifications/:id",check,function(req,res){
    User.findById(req.session.crntUser.ID,function(err,user){
        if(err)
        {
            console.log("Error while finding the user for notification");
            req.session.msg = messages.serverError;
            res.redirect("back");
        }
        else
        {
            for(let i = 0; i<user.notifications.length; i++)
            {
                if(String(user.notifications[i]._id) === String(req.params.id))
                {
                    user.notifications[i].viewed = true;
                    user.save(function(err,newUser){
                        if(err)
                        {
                            console.log("Error while saving the user for notification");
                            req.session.msg = messages.serverError;
                            res.redirect("back");
                        }
                        else
                        {
                            if(user.notifications[i].notifType === false)
                            {
                                res.redirect("/photo/" + user.notifications[i].id +"/show");
                            }
                        }
                    })
                    break;
                }
            }
        }
    })
})

app.get("/photo/:id/collection",function(req,res){
    if(req.session.isLoggedIn)
    {
        User.findById(req.session.crntUser.ID)
        .then((user)=>{
            user.collections.push(req.params.id);
            user.save(function(err,user){
                if(err)
                {
                    console.log("error while saving the user with the new collection");
                    req.session.msg = messages.serverError;
                    res.redirect("back");
                }
                else
                {
                    req.session.msg = {
                        type:false,
                        text:"Added to collection successfully"
                    }
                    res.redirect("back");
                }
            })
        })
        .catch((err)=>{
            console.log("Error while getting the user during adding the image to the collection");
            req.session.msg = messages.serverError;
            res.redirect("back");
        })
    }
    else
    {
        req.session.msg = messages.logErr;
        res.redirect("back");
    }
});

app.get("/user/:id/public",function(req,res){

})
app.use(function(req,res,next){
    res.status(404).render("error");
});


function check(req,res,next)
{
    if(req.session.isLoggedIn)
        return next();
    else
    {
        req.session.msg = {
            type:false,
            text:"You need to login to access that page"
        }
        res.redirect("/");
    }
}

function dash(req,res,next)
{
    if(String(req.session.crntUser.ID) === String(req.params.id))
    {
        return next(); 
    }
    else
    {
        req.session.msg = {type:false,
            text:"You can't access other user's dashboard"
        }; 
        res.redirect("/");
    } 
}

app.listen(app.get("PORT"),function(){
    console.log("Server started at " + app.get("PORT")+" ...");
});