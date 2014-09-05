'use strict';

angular.module('lenderbee.services', [])

	.factory('searchresultsFact', ['$http', '$location', function($http, $location) {
		// This is where I would require the $http dependency and write my ajax methods here
		var results = {};

		results.getSearchResults = function(querystr) {
			// $http ajax call to the server to get searchResults
			// Returns a promise and then send it over to the controller? Or does the logic have to be in the controller?
			console.log("this is the querystr in getSearchResults: ", querystr);
			return $http({
				method: 'POST',
				url: '/api/search',
				data: {itemname: querystr}
			})
			.then(function(err, resp) {
				if (err) {
					throw err;
				}
				this.searchResults = resp.data;
				$location.path('/searchresults');
				console.log(resp.data, 'this is the response data');
				// return resp.data;
			});
		};

		/* This function call might not be necessary
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
		*/

		return results;

		// return {
		// 	searchResults: [
		// 		{
		// 			itemid: 9,
		// 			itemdescription: 'legit power drill',
		// 			tags: ['powertool', 'goodcondition'],
		// 			distance: 0.5
		// 		},
		// 		{
		// 			itemid: 25,
		// 			itemdescription: 'Black and Decker Power Drill',
		// 			tags: ['powertool', 'almostnew'],
		// 			distance: 1.2
		// 		},
		// 		{
		// 			itemid: 356,
		// 			itemdescription: 'working power drill; low voltage',
		// 			tags: ['powertool', 'savepower'],
		// 			distance: 0.3
		// 		}
		// 	]
		// };
	}]);
