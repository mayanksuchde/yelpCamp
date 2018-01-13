var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

var campgrounds=[
            {name:"Salmon creek",image:"https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1"},
            {name:"Black Lake",image:"https://static1.squarespace.com/static/57a33100579fb3f47b0e4f5f/57c33c569f745643297c9a2b/57c33c568419c2d24d5e3839/1472412848948/Campsite7.jpg"},
            {name:"Tahoe river",image:"https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg"},
            {name:"Serious river",image:"https://www.oars.com/wp-content/uploads/2014/07/Rogue-JamesKaiser-570.web_-1024x684.jpg"}
        ];

app.get("/campgrounds",function(req,res){
    
        
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name: name,image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req, res) {
    res.render("new")
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
});