angular.module('lenderbee.searchbar', [])
	.controller('searchbarController', ['$scope', function($scope) {
		// I need a service or a factory that does the ajax call to the server
		// Then I need those results stored somewhere so they could be accessed or searched for
		$scope.search = {};

		// Maybe include some validation logic as well?
		$scope.search = function() {

		}

	}]);