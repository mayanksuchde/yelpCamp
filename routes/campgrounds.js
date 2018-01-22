var express =require("express");
var router =express.Router();
var Campground=require("../models/campgrounds");


//campgrounds index route
router.get("/",function(req,res){
        
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
            }
        })
    
});

//campgrounds CREATE route
router.post("/",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name: name,image: image,description: desc};
    
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});


//campground new route
router.get("/new",function(req, res) {
    res.render("campgrounds/new")
})

//campgrounds show route
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           console.log(err)
       } else{
           
           
           res.render("campgrounds/show",{campground:foundCampground});
       }
    });
    
    
});

//middleware 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}


module.exports=router; 