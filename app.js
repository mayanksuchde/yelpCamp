var express   =require("express"),
    app       =express(),
    bodyParser=require("body-parser"),
    mongoose  =require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
//   name:"Black Lake",
//   image:"https://static1.squarespace.com/static/57a33100579fb3f47b0e4f5f/57c33c569f745643297c9a2b/57c33c568419c2d24d5e3839/1472412848948/Campsite7.jpg",
//   description:"This is a huge campground with lake viwe and no toilets"
// },function(err,campground){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Newly created campground:");
//         console.log(campground);
//     }
// });

app.get("/",function(req,res){
    res.render("landing");
});



app.get("/campgrounds",function(req,res){
    
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("index",{campgrounds:allCampgrounds});
            }
        })
    
});

app.post("/campgrounds",function(req,res){
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

app.get("/campgrounds/new",function(req, res) {
    res.render("new")
})

app.get("/campgrounds/:id",function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
       if(err){
           console.log(err)
       } else{
           res.render("show",{campground:foundCampground});
       }
    });
    
    
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
});