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
				console.log(results.searchResults, "this is results.searchResults");
				if (results.searchResults.length === 0) {
					$location.path('/searchresultsnone');
				}
				else {
					$location.path('/searchresults');
				}
				// console.log(resp.data, 'this is the response data');
			})
		};

		// Return the results object
		return results;
	
	}])

	.factory('signup', ['$http', '$window', function($http, $window) {
		var signup = function() {
			$window.open('/auth/facebook');
		}

		return {
			signup: signup
		};	

	}])

	.factory('searchagain', ['$location', function($location) {
		var searchagain = function() {
			$location.path('/searchbar');
		};

		return {
			searchagain: searchagain
		};

	}]);
