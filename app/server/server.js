// Base set-up where packages, modules, and other files are required.

// Require Express for server configuration, routing, etc.
var express = require('express');

// Require Passport and associated resources to handle user authentication
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var flash = require('connect-flash');

// Require middleware
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Define app using Express and port for securing server connection
var app = express();
var port = process.env.PORT || 7432;

// configuration (to be used later) ================================
// require('./config/passport')(passport); // pass passport for configuration

// Set up and configure Express application

// Use bodyParser to handle JSON objects
// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cookierParser to provide and parse cookies
// https://github.com/expressjs/cookie-parser
app.use(cookieParser());

// Use morgan for request logging
// https://github.com/expressjs/morgan
app.use(morgan('dev'));

// Set up and configure Passport
app.use(session({ secret: 'ilovelenderbee' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions after successful authentication
app.use(flash()); 

// Set up static file-routing
app.use(express.static(__dirname + '/app/client'));

// Set up route-handling using Express 4.0 Router
var router = express.Router();

// middleware to use for ALL requests to confirm that something is happening
// strictly for testing purposes (to be removed before )
router.use(function(request, response, next) {
	console.log("A request has been made to the server");
	next();
});

// base route for testing purposes
router.get('/', function(request, response) {
	response.json({ message: "this is a test" });
});

// routes for managing inventory
router.route('/inventory')
  .post(function(request, response) {
  	console.log('adding a new item to user inventory');
  	// insert logic for database query
  })
  .post(function(request, response) {
  	console.log('removing an existing item from user inventory');
  	// insert logic for database query 
  });

// route for searching for an item
router.route('/search')
  .post(function(request, response) {
  	console.log('searching for an item');
  	// insert logic for database query
  });

// Set up routes to be prefixed with API
app.use('/api', router);

// routes (to be changed later) ======================================
// require('./app/routes/js')(app, passport);

// Open server connection
app.listen(port);
console.log('Server now open and listening on port:', port);