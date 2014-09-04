'use strict';

angular.module('lenderbee.searchresults', ['lenderbee.services'])
	
	.controller('searchresultsController', ['$scope', 'searchresultsFact', function($scope, searchresultsFact) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data".
		$scope.data = searchresultsFact;
		// console.log($scope.data, "this is scope.data");
		// console.log(typeof $scope.data, "typeof scope.data");

		/*

		$scope.getSearchResults = function() {
			// Returns a promise that I can then store to $scope.data
			searchResultsFact.getSearchResults
				.then(function(data) {
					// What this does is it sets a property in the $scope.data that has a results property equal to the array of search results objects coming back from the server
					$scope.data.results = data; 
				})
		}

		*/

	}]);
