// Requiring dependencies and models.

var express = require("express"),
	router =  express.Router({mergeParams: true}),
	Campground = require("../models/campgrounds"),
	Comment = require("../models/comment"),
	middleware = require("../middleware/index.js");

//Create a new comment (Get route)

router.get("/new", middleware.isLoggedIn, function(req, res)
	   {
	Campground.findById(req.params.id, function(err, campground){
		
		if(err){
			console.log(err);
		}
		
		else{
				res.render("comments/new", {campground: campground});
		}
	});
	
});

//Comments create (Post Route)

router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
			   req.flash("error", "Something went wrong!");
               console.log(err);
           } else {
			   //add username and ID to comment and then save comment		
				comment.author.id = req.user.id;
			    comment.author.username = req.user.username;
                
			   //Save comment
			    comment.save();
			    
			    campground.comments.push(comment);
                campground.save();
			   	req.flash("success","Successfully created comment!");
                res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

//Comments edit route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	
	Campground.findById(req.params.id, function(err, foundCampground){
		
		if(err || !foundCampground){
			req.flash("error", "No Campground found!");
			return res.redirect("back");
		}
		
			Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}
		else {
	res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
		});
	});	
});


// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

//Comments destroy route

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		
		if(err){
			res.redirect("back");
		}
		
		else {
			req.flash("success", "Sucessfully deleted comment!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});
		
//Module exports

module.exports = router;
