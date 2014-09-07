'use strict';

angular.module('lenderbee.searchresultsnone', ['lenderbee.services'])
	
	.controller('searchresultsnoneController', ['$scope', 'signup', function($scope, signup) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data.searchResults in the view".
		$scope.signup = signup.signup;

	}]);
