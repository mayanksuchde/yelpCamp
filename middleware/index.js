var Campground=require("../models/campgrounds");
var Comment=require("../models/comments");

var middlewareObj={};


middlewareObj.checkCampgroundOwnership=function checkCampgroundOwnership(req,res,next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,foundCampground){
                if(err){
                    req.flash("error","Campground not found");
                    res.redirect("back")
                }else{
                     //CHECK IF THE THIS CAMPGROUND WAS MADE BY THE USER WHO IS LOGGED IN
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();    
                    }else{
                        req.flash("error","You dont have permission to do that");
                        res.redirect("back");
                    }
                }
        });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function checkCommentOwnership(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    res.redirect("back")
                }else{
                     //CHECK IF THE THIS Comment WAS MADE BY THE USER WHO IS LOGGED IN
                    if(foundComment.author.id.equals(req.user._id)){
                        next();    
                    }else{
                        req.flash("error","You dont have permission to do that");
                        res.redirect("back");
                    }
                }
        });
    }else{
        req.flash("error","You need to be logged in to do that");   
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error","You need to be Logged in first");
        res.redirect("/login");
    }
}



module.exports=middlewareObj;