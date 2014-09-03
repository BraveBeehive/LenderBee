angular.module('lenderbee.searchbar', ['lenderbee.services'])

	.controller('searchbarController', ['$scope', '$location', 'searchresultsFact', function($scope, $location, searchresultsFact) {
		// searchresultsFact holds the data and does the ajax calls

		// As a hack to make this functional, including $location to switch the location to /searchresults view	
		$scope.search = function() {
			$location.path('/searchresults');
		};

		// my search function should call the getSearchResults method on the searchresults factory.
		// $scope.search = searchresultsFact.getSearchResults;

	}]);