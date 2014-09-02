// Base set-up where packages, modules, and other files are required.

// Require Express
var express = require('express');

// Define app using Express
var app = express();

// Require bodyParser to handle JSON objects
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// route for adding new items to inventory
router.route('/add')
  .post(function(request, response) {
  	console.log('adding a new item to user inventory');
  	// insert logic for database query
  })
// route for searching for an item
  .post(function(request, response) {
  	console.log('searching for an item');
  	// insert logic for database query
  });
  
// Set up routes to be prefixed with API
app.use('/api', router);

// Define the port for use and start-up server.
var port = process.env.PORT || 7432;
app.listen(port);
console.log('Server now open and listening on port:', port);