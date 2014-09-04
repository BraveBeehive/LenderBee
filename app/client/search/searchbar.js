angular.module('lenderbee.searchbar', ['lenderbee.services'])

	.controller('searchbarController', ['$scope', '$location', 'searchresultsFact', function($scope, $location, searchresultsFact) {
		// searchresultsFact holds the data and does the ajax calls
		// this might need to be re-worked as well
		$scope.searchQuery = {};

		// searchItem function should call the getSearchResults method on the searchresults factory.
		// Might be some syntactical issues, but for the most part, the logic is on track.
		$scope.searchItem = function(querystr) {
			$scope.loading = true;
			console.log("this is the querystr: ", querystr);

			// searchresultsFact
			// 	.getSearchResults(querystr)
			// 	.success(function(_, status) {
			// 		$scope.loading = false;
			// 		// $location.path('/searchresults');
			// 	})
			// 	.error(function() {
			// 		$scope.loading = false;
			// 	});

			$location.path('/searchresults');	

		};

	}]);