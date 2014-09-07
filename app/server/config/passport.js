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

	//deserialize a user to destroy a session
	passport.deserializeUser(function(id, done) {
		console.log('about to deserialize');
	  new User({id: id}).fetch().then(function(user) {
	  	console.log('in new user creation', user);
	  	return done(null, user);
	  }, function(error) {
	  	console.log('there is an error', error);
	  	return done(error);
	  });

	  // User.findById(id, function(err, user) {
	  // 	done(err, user);
	  // });
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
					facebookProfileID: profile.id,
					facebookToken: token,
					facebookName: profile.name.givenName + ' ' + profile.name.familyName,
					facebookEmail: profile.emails[0].value
				}).fetch().then(function(found) {
					if(found) {
						console.log('user already exists!');
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
							console.log('user added!!!');
							return done(null, newUser);
						});
					}
				});
			});
		}
	));
};
