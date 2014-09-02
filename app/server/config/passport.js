// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model (from the database)
var User = require('../../client/users/testUser.js');

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

	// local sign-up
	// uses a named strategy
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		// allow us to pass all data to a callback
		passReqToCallback: true
	},

	function(request, email, password, done) {
		// use process.nextTick to handle asynchronously
		// TO-DO: refactor using promises
		process.nextTick(function() {
			// find a user whose e-mail is the same as the submitted e-mail
			// checking to see if the user already exists
			User.findOne({ 'local.email' : email }, function(err, user) {
				if (err) {
					return done(err);
				}

				// check to see if a user exists already
				if (user) {
					return done(null, false, request.flash('signupMessage', 'That e-mail is already in use.'));
				} else {
					// if there is no user by that name, create a new user
					var newUser = new User();

					// set the local email and password
					newUser.local.email = email;
					// hash the user's password
					newUser.local.password = newUser.generateHash(password);

					// save the user to our database
					newUser.save(function(err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
			});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(request, email, password, done) {
		User.findOne({ 'local.email' : email }, function(err, user) {
			if (err) {
				return done(err);
			}

			// if no user is found, return the message
			if (!user) {
				console.log('user not found');
				return done(null, false, request.flash('loginMessage', 'No user found with that e-mail'));
			}

			// if user is found, but password is incorrect
			if (!user.validPassword(password)) {
				console.log('user found, but password incorrect');
				return done(null, false, request.flash('loginMessage', 'You have entered an incorrect password'));
			}

			// else, user is found and everything has gone successfully
			console.log('you\'re logged in now');
			return done(null, user);
		});
	}));
};