var mongoose=require('mongoose');

//define schema
var UserSchema=mongoose.Schema({
	rationid:{
		type:String,
		index:true
	},
	password:{
		type:String
	},
	email:{
		type:String
	},
	name:{
		type:String
	},
	address:{
		type:String
	},
	pincode:{
		type:Number
	},
	city:{
		type:String
	},
	state:{
		type:String
	},
	country:{
		type:String
	},
	imageUrl:{
      type:String
	}
});
UserSchema.methods.validPassword=function(pwd){
return (this.password==pwd);
};
//Model the Schema
module.exports = mongoose.model('users',UserSchema);
