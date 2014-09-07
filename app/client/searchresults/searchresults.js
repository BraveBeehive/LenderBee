'use strict';

angular.module('lenderbee.searchresults', ['lenderbee.services'])
	
	.controller('searchresultsController', ['$scope', 'searchresultsFact', 'signup', function($scope, searchresultsFact, signup) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data.searchResults in the view".
		$scope.data = searchresultsFact;
		$scope.signup = signup.signup;
		console.log(searchresultsFact.searchResults, 'this is searchresultsFact.searchResults');

	}]);
