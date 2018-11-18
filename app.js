var express          =   require('express');
var path             =   require('path');
var cookieParser     =   require('cookie-parser');
var bodyParser       =   require('body-parser');
var exphbs           =   require('express-handlebars');
var expressValidator =   require('express-validator');
var passport         =   require('passport');
var LocalStrategy    =   require('passport-local').Strategy;
var flash            =   require('connect-flash');
var session          =   require('express-session');
var Handlebars       =   require('handlebars');
var HandlebarsIntl   =   require('handlebars-intl');
var mongo            =   require('mongodb');
var mongoose         =   require('mongoose');
mongoose.connect('mongodb://localhost/vitran');
var db               =   mongoose.connection;


//Routes
var index            =   require('./routes/index');
//var admindash        =   require('./routes/admindash');
var logout           =   require('./routes/logout');
var userlogin        =   require('./routes/userlogin');
var register         =   require('./routes/register');
//var userdash         =   require('./routes/userdash');
var adminlogin       =   require('./routes/adminlogin');
var updatedetails    =   require('./routes/updatedetails');
 //Init app
var app=express();

// Handlebars.registerHelper('ifCond', function(v1, v2, options) {
//   if(v1 === v2) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

//view Engine
HandlebarsIntl.registerWith(Handlebars);

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');


//bodyParser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//static folders
app.use(express.static(path.join(__dirname,'public')));


app.use(cookieParser());
//Express sessions
app.use(session({
 secret: 'secret',
 saveUninitialized: true,
 resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validators
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//Global Variables
app.use(function(req,res,next){
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg   = req.flash('error_msg');
res.locals.error       = req.flash('error');
res.locals.user        = req.user||null;
next();
});

//Handle routes
app.use('/',userlogin);
//app.use('/userdashboard',userdash);
//app.use('/admindashboard',admindash);
app.use('/adminlogin',adminlogin);
app.use('/userlogin',userlogin);
app.use('/logout',logout);
app.use('/register',register);
app.use('/updatedetails',updatedetails);
//connect app 

app.listen(8084,function(){
	console.log('server is listing to 8084');
});