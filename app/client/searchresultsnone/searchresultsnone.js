'use strict';


// Module and controller currently not in use.
// The search results none view is using the search results controller.
angular.module('lenderbee.searchresultsnone', ['lenderbee.services'])
	
	.controller('searchresultsnoneController', ['$scope', 'signup', 'searchagain', function($scope, signup, searchagain) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data.searchResults in the view".
		$scope.signup = signup.signup;

	}]);
