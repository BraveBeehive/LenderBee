'use strict';

// This module is for the search bar feature
angular.module('lenderbee.searchbar', ['lenderbee.services'])

	.controller('searchbarController', ['$scope', '$location', 'searchresultsFact', 'signup', function($scope, $location, searchresultsFact, signup) {
		// searchresultsFact holds the data and does the ajax calls

		// searchQuery stores the querystr property that will be passed to the ajax call
		$scope.searchQuery = {};

		// searchItem function should call the getSearchResults method on the searchresults factory.
		$scope.searchItem = searchresultsFact.getSearchResults;
		// console.log(searchresultsFact, 'this is searchresultsFact');

		// Logic is located in the service folder as part of a factory
		$scope.signup = signup.signup;

	}]);
