var express = require('express');
var User    = require('../models/user');
var router  = express.Router();

router.get('/',function(req,res){
   res.render('register');
});

router.post('/',function(req,res){
  var name        = req.body.name.toLowerCase();
  var rationid    = req.body.rationid;
  var email       = req.body.email;
  var password1   = req.body.password1;
  var password2   = req.body.password2;
  var address     = req.body.address;
  var pincode     = req.body.pincode;
  var state       = req.body.state;
  var city        = req.body.city.toLowerCase();
  var country     = req.body.country.toLowerCase();
  
  //Validations
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Not a valid Email').isEmail();
  req.checkBody('rationid','Ration Number is required').notEmpty();
  req.checkBody('pincode','Pincode is required').notEmpty();
  req.checkBody('state','State is required').notEmpty();
  req.checkBody('city','City is required').notEmpty();
  req.checkBody('country','Country is required').notEmpty();
  req.checkBody('password1','Password is required').notEmpty();
  req.checkBody('password2','Confirm Password field can not be empty').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password1);
  var errors=req.validationErrors();
  if(errors){
  	res.render('register',{
       errors:errors
  	});
  }
  else{
    name = name.split(' ');
    var newname = "";
    for(var i = 0;i < name.length; i++){
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
      newname+=name[i] + " "; 
    }
  	var newUser = User({
  		rationid:rationid,
  		password:password1,
  		email:email,
  		name:newname,
      address:address,
      state:state,
      city:city,
      country:country,
      pincode:pincode
  	});
  	newUser.save(function(err,data){
       if(err)
       	throw err;
      // console.log(data);
  	});
     
    // req.flash('success_msg','You are registered!');
     res.redirect('/userlogin');
}
});

module.exports = router;