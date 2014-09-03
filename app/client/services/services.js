angular.module('lenderbee.services', [])

	.factory('searchresultsFact', ['$http', '$location', function($http, $location) {
		// This is where I would require the $http dependency and write my ajax methods here
		var results = {};

		results.getSearchResults = function() {
			// $http ajax call to the server to get searchResults
			// Returns a promise and then send it over to the controller? Or does the logic have to be in the controller?
			return $http({
				method: "GET",
				url: '/api/something'
				// Data for the query string or pass it into the URL as an argument in the function to the url
			})
			.then(function(err, resp) {
				if (err) {
					throw err;
				}
				this.searchResults = resp.data;
				$location.path('/searchresults');
				console.log(resp.data, "this is the response data");
				// return resp.data;
			});
		};

		results.sendQuery = function(query) {
			// Send an ajax post request to query the data back.
			return $http({
				method: "POST",
				url: '/api/something',
				data: query // Or something related to the Bookshelf ORM
			})
			.then(function(resp){
				console.log(resp, "this is resp");
			});
		};

		// Might need another function that's called queryThenDisplay?

		return {
			searchResults: [
				{
					itemid: 9,
					itemdescription: "legit power drill",
					tags: ["powertool", "goodcondition"],
					distance: .5
				},
				{
					itemid: 25,
					itemdescription: "Black and Decker Power Drill",
					tags: ["powertool", "almostnew"],
					distance: 1.2
				},
				{
					itemid: 356,
					itemdescription: "working power drill; low voltage",
					tags: ["powertool", "savepower"],
					distance: .3
				}
			]
		}
	}]);