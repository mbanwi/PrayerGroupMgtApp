
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//middleware for bodyParser
app.use(bodyParser.json());

User = require('./models/user');

//connect to Mongoose. Rem mongoose is used to interact with mongodb
mongoose.connect('mongodb://localhost/prayergroup');
//a db object
var db = mongoose.connection;

/* ==========GET REQUEST=================*/
//any req coming in from the / url, call this function.
app.get('/', function(req, res){
	res.send('Hello from Server')
});

/*============GET USERS================
  any req coming in from the / url, call this function.
  So this is the getUsers
  */
app.get('/api/users', function(req, res){
	//implement the callback function which was just mention in the user.js 
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		//otherwise give me a response in json objects
		res.json(users);
	});
});

/*
===========GET USER  BY  ID=========
  get a particular user

*/
app.get('/api/users/:_id', function(req, res){
	//implement the callback function which was just mention in the user.js 
	User.getUserById(req.params._id, function(err, user){
		if(err){
			throw err;
		}
		//otherwise give me a response in json objects
		res.json(user);
	});
});


/* GET CONTRIBUTION BY USER*/

app.get('/api/contributions/:_id', function(req, res){
	//implement the callback function which was just mention in the user.js 
	User.getContrByUserId(req.params._id, function(err, user){
		if(err){
			throw err;
		}
		//otherwise give me a response in json objects
		res.json(user.contribution);
	});
});


/* ==========POST REQUEST=================*/

/*=======ADD USER==============
create or add user

*/
app.post('/api/users', function(req, res){
	var user = req.body;
	//implement the callback function which was just mention in the genre.js 
	User.addUser(user, function(err, user){
		if(err){
			throw err;
		}
		//otherwise give me a response in json objects
		res.json(user);
	});
});

/*
=========PUT OR UPDATE USER===========

*/
app.put('/api/users/:_id', function(req, res){
	var id = req.params._id;
	var user = req.body;
	//implement the callback function which was just mention in the genre.js 
	User.updateUser(id, user, {}, function(err, user){
		if(err){
			throw err;
		}
		//otherwise give me a response in json objects
		res.json(user);
	});
});


/*
=======DELETE USER===============

*/
app.delete('/api/users/:_id', function(req, res){
	//get the id
	var id = req.params._id;
	//implement the callback function which was just mention in the genre.js 
	User.deleteUser(id, function(err, user){
		if(err){
			throw err;
		}
		//otherwise give me a response in json objects
		res.json(user);
	});
});

app.listen(3000);
console.log('Server up and running on port: 3000...');