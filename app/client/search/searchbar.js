'use strict';

angular.module('lenderbee.searchbar', ['lenderbee.services'])

	.controller('searchbarController', ['$scope', '$location', 'searchresultsFact', function($scope, $location, searchresultsFact) {
		// searchresultsFact holds the data and does the ajax calls

		// searchQuery stores the querystr property that will be passed to the ajax call
		$scope.searchQuery = {};

		// searchItem function should call the getSearchResults method on the searchresults factory.
		// Might be some syntactical issues, but for the most part, the logic is on track.

		$scope.searchItem = searchresultsFact.getSearchResults;
		console.log(searchresultsFact, 'this is searchresultsFact');

	}]);
