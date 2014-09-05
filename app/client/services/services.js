'use strict';

angular.module('lenderbee.services', [])

	.factory('searchresultsFact', ['$http', '$location', function($http, $location) {
		// This is where I would require the $http dependency and write my ajax methods here
		var results = {};

		results.getSearchResults = function(querystr) {
			// $http ajax call to the server to get searchResults
			return $http({
				method: 'POST',
				url: '/api/search',
				data: {item: querystr}
			})
			// Returns as promise. As it gets resolved, store the data in results.searchResults
			.then(function(resp) {
				results.searchResults = resp.data;
				console.log(resp.data, 'this is the response data');
				console.log(results.searchResults, "this is results.searchResults");
			})
			// After storage of data, send client to searchresults view
			.then(function() {
				$location.path('/searchresults');
			});
		};

		// Return the results object
		return results;
	
	}]);
