'use strict';

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model (from the database)
var User = require('../database/models/user.js');
var Users = require('../database/collections/users.js');

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

	//deserialize a user to destroy a session (upon logout, etc.)
	passport.deserializeUser(function(id, done) {
		console.log('about to deserialize');
	  new User({
	  	id: user.id
	  })
	  .fetch()
	  .then(function(err, user) {
	  	return done(err, user);
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
				new User({
					facebookProfileID: profile.id
				})
				.fetch()
				.then(function(user) {
					if(user) {
						console.log('User already exists.');
						return done(null, user);
					}
					else {
						var newUser = new User({
							facebookProfileID: profile.id,
							facebookToken: token,
							facebookName: profile.name.givenName + ' ' + profile.name.familyName,
							facebookEmail: profile.emails[0].value
						});

						newUser.save().then(function(newUser) {
							Users.add(newUser);
							console.log('New user added.');
							return done(null, newUser);
						});
					}
				});
			});
		}
	));
};
