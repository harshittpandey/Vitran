var express = require('express');
var router  = express.Router();
var User    = require('../models/user');

router.post('/',function(req,res){
	if(req.body.uname.length!=0){
		User.update({_id:req.user._id},{$set: {name:req.body.uname}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	if(req.body.ubirthday.length!=0){
		User.update({_id:req.user._id},{$set: {birthday:req.body.ubirthday}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	if(req.body.uprofession.length!=0){
		User.update({_id:req.user._id},{$set: {profession:req.body.uprofession}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	if(req.body.ucity.length!=0){
		User.update({_id:req.user._id},{$set: {city:req.body.ucity}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	if(req.body.ucountry.length!=0){
		User.update({_id:req.user._id},{$set: {country:req.body.ucountry}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	if(req.body.upassword.length!=0){
		User.update({_id:req.user._id},{$set: {password:req.body.upassword}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	res.redirect('/dashboard');
});

module.exports = router;