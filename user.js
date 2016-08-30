var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	fname:{
		type: String,
		required: true
	},
	lname:{
		type: String,
		required: true
	},

	telephone:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},

	contribution:{
		type: Number,
		default: null
	},

	create_date:{
		type:Date,
		default:Date.now
	}

});

//user object
var User = module.exports = mongoose.model('User', userSchema);

//==========get Users=============
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}

//=========ADD USER module===========
module.exports.addUser = function(user, callback){
	//just like in the shell,  this will find a particular genres by its id
	User.create(user, callback);
}


//=========GET CONTRIBUTION BY USERID module===========
module.exports.getContrByUserId = function(id, callback){
	//just like in the shell,  this will find a particular genres by its id
	Book.findById(id, callback);

}

//========UPDATE User module===========
module.exports.updateUser = function(id, user,  options, callback){
	var query = {_id:id};
	//var singleContribution = req.body.contribution;
	//User.contribution += singleContribution;
	var update = {
		fname : user.fname,
		lname : user.lname,
		email : user.email,
		telephone : user.telephone,
		contribution : user.contribution
	}
	//just like in the shell,  this will find all users
	User.findOneAndUpdate(query, update, options, callback);
}

//=========REMOVE BOOK module===========
module.exports.deleteUser = function(id, callback){

	var query = {_id : id};
	//just like in the shell,  this will find all genres
	User.remove(query, callback);
}