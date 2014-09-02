// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model (from the database)
var User = require('../app/server/database/user');

// export these functions to our app
module.exports = function(passport) {

// session set-up
// required for persistent login sessions
// creating and destroying sessions is handled here
	
	// serialize user to create a session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	//deserialize a user to destroy a session
	passport.deserializeUser(function(id, done) {
		// find a user by ID
		  done(err, user);
	});


};