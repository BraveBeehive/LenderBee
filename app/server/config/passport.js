'use strict';

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model (from the database)
var User = require('../database/testUser.js');

// require authorization variables for Facebook
var configAuth = require('./auth.js');

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
	  User.findById(id, function(err, user) {
	  	done(err, user);
	  });
	});

	// Session set-up for Facebook
	passport.use(new FacebookStrategy({
		// set up app ID/secret/callback URL from configAuth
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},

		// facebook will send back a token and profile
		function(token, refreshToken, profile, done) {
			// required for asynchonicity
			process.nextTick(function() {
				// find the user in the database by facebook user id
				User.findOne({ 'facebook.id': profile.id }, function(err, user) {
					// if there is an error, return the error
					if (err) {
						return done(err);
					}
					// if there is a user with that ID, log-in
					if (user) {
						// user found; return user
						return done(null, user);
					} else {
						// create new user
						var newUser = new User();

						// create all facebook attributes for new user
						newUser.facebook.id    = profile.id;
	          newUser.facebook.token = token;	                
	          newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
	          newUser.facebook.email = profile.emails[0].value;

						// save new user to database
						newUser.save(function(err) {
							if (err) {
								throw err;
							}

							// successfully created and saved new user
							return done(null, newUser);
						});
					}
				});
			});
		}
	));
};
