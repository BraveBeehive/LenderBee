'use strict';

angular.module('lenderbee.services', [])

	.factory('searchresultsFact', ['$http', '$location', function($http, $location) {
		// This is where I would require the $http dependency and write my ajax methods here
		var results = {};

		// $http ajax call to the server to get searchResults
		results.getSearchResults = function(querystr) {
			return $http({
				method: 'POST',
				url: '/api/search',
				// Data is sent as an object with the item property that corresponds to the item field of the inventory table.
				data: {item: querystr}
			})
			// Returns as promise and then stores the data in results.searchResults
			.then(function(resp) {
				// Results now has a searchResults property equal to an array that contains item objects
				results.searchResults = resp.data;
				// console.log(results.searchResults, "this is results.searchResults");
				if (results.searchResults.length === 0) {
					// If the array of objects in searchResults is 0, then load the search results none view
					$location.path('/searchresultsnone');
				}
				else {
					// Otherwise, redirect to the search results
					$location.path('/searchresults');
				}
			})
		};

		// Return the results object
		return results;
	
	}])

	.factory('signup', ['$http', '$window', function($http, $window) {
		// Signup function that just redirects to Facebook authentication
		var signup = function() {
			$window.open('/auth/facebook');
		}

		return {
			signup: signup
		};	

	}])

	.factory('searchagain', ['$location', function($location) {
		// Simple function that just redirects user to the searchbar again
		var searchagain = function() {
			$location.path('/searchbar');
		};

		return {
			searchagain: searchagain
		};

	}]);
