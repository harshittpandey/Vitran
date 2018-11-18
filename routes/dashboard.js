var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var Post    = require('../models/posts');
var moment  = require('moment');

router.get('/',function(req,res){
	Post.find({
	    "$or": [{
	        "userid": req.user.username
	    }, {
	        "userid": {"$in": req.user.following}
	    }]
    }).sort({"creation": -1}).exec(function(err,data){
	  if(err)throw err;
	  else{
	  	for(var i = 0;i < data.length; i++){
	  		var likedby = data[i].likedby;
	  		var index   = likedby.indexOf(req.user.username);
	  		if(index!=-1){
	  			data[i].isliked = 1;
	  		}
	  		else{
	  			data[i].isliked = 0;
	  		}
	  	}
	    res.render('dashboard',{
	    	posts : data
	    });
	  }
	});
});


module.exports = router;