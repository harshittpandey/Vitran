var mongoose=require('mongoose');

//define schema
var AdminSchema=mongoose.Schema({
	adminid:{
		type:String,
		index:true
	},
	password:{
		type:String
	},
	shopid:{
		type:String
	}
});
AdminSchema.methods.validPassword=function(pwd){
return (this.password==pwd);
};
//Model the Schema
module.exports = mongoose.model('admin',AdminSchema);
