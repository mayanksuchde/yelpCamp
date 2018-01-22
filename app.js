var express   =require("express"),
    app       =express(),
    bodyParser=require("body-parser"),
    mongoose  =require("mongoose"),
    passport  =require("passport"),
    LocalStrategy=require("passport-local"),
    Campground=require("./models/campgrounds"),
    Comment   =require("./models/comments"),
    User       =require("./models/user"),
    seedDB=require("./seeds");
    
//requireing routes
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index");
    

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//PASSPORT CONFIRGURATION
app.use(require("express-session")({
    secret:"Mayank is Awesome",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   next();
});


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
});