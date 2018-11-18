var express       = require('express');
var passport      = require('passport');
var LocalStrategy =require('passport-local').Strategy;
var User          = require('../models/user');
var router        = express.Router();

router.get('/',function(req,res){
res.render('userlogin');
});

//configuring my local strategy
passport.use(new LocalStrategy(
  function(rationid, password, done) {
    User.findOne({ rationid: rationid }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect Ration Number.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//sessions data to identify the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/',
  passport.authenticate('local',{successRedirect:'/userdash',failureRedirect:'/userlogin',failureFlash:true}),
  function(req, res) {
   res.redirect('/userdash'); 
 });


module.exports = router;