var mongoose=require("mongoose"),
    Campground=require("./models/campgrounds"),
    Comment=require("./models/comments");
    
var data=[
        {
          name: "Marie Lake",
          image: "http://briangarson.com/blog/wp-content/uploads/2009/09/marielake.jpg",
          description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {
          name: "Pog Lake",
          image: "http://www.planetware.com/photos-large/CDN/ontario-algonquin-provincial-park-pog-lake-campground.jpg",
          description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {
          name: "Lake of Two Rivers",
          image: "http://www.planetware.com/photos-large/CDN/ontario-algonquin-provincial-park-lake-of-two-rivers-campground.jpg",
          description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {
          name: "Achray",
          image: "http://www.planetware.com/photos-large/CDN/ontario-algonquin-provincial-park-campgrounds-achray.jpg",
          description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {
          name: "Rock Lake",
          image: "http://www.planetware.com/photos-large/CDN/ontario-algonquin-provincial-park-rock-lake-campground.jpg",
          description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        }
    ];
    
   
function seedDB(){
        
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("REMOVED Campground ");
            data.forEach(function(seed){
            Campground.create(seed,function(err,newCampground){
            if(err){
                console.log(err);
            }else{
                console.log("added a campground");
                
                //Create new comments
                Comment.create(
                    {
                    text:"The place is great but does not have Wifi or cellular network",
                    author:"Mayank"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        newCampground.comments.push(comment._id);
                        newCampground.save();
                        console.log("created new comment");
                    }
                    
                });
            }
        });
    });
}
    });
}

module.exports=seedDB;
