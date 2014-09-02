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

// base route for testing purposes
router.get('/', function(req, res) {
	res.json({ message: "this is a test" });
});

// Set up routes to be prefixed with API
app.use('/api', router);

// Define the port for use and start-up server.
var port = process.env.PORT || 7432;
app.listen(port);
console.log('Server now open and listening on port:', port);