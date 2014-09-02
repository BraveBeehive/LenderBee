module.exports = function(app, passport) {
	app.use(function(request, response, next) {
		console.log("A request has been made to the server");
		next();
	});

	// base route for testing purposes
	app.get('/', function(request, response) {
		response.json({ message: "this is a test" });
	});

	// testing signup
	app.post('/signup', passport.authenticate('local-signup'), function(request, response) {
	  console.log('sign-up was called');
	  response.send(200);
	});

	// testing login
	app.post('/login', passport.authenticate('local-login'), function(request, response) {
		console.log('log-in was called');
		response.send(200);
	});

	// routes for managing inventory
	app.post('/inventory', function(request, response) {
  	console.log('adding a new item to user inventory');
  	// insert logic for database query
  	response.send(200);
  });

	// app.post(function(request, response) {
 //  	console.log('removing an existing item from user inventory');
 //  	// insert logic for database query 
 //  	response.send(200);
 //  });

	// route for searching for an item
	app.post('/search', function(request, response) {
  	console.log('searching for an item');
  	// insert logic for database query
  	response.send(200);
  });
};