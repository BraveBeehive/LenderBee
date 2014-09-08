'use strict';

angular.module('lenderbee.searchresults', ['lenderbee.services'])
	
	.controller('searchresultsController', ['$scope', 'searchresultsFact', 'signup', 'searchagain', function($scope, searchresultsFact, signup, searchagain) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data.searchResults in the view".
		$scope.data = searchresultsFact;
		$scope.signup = signup.signup;
		$scope.searchagain = searchagain.searchagain;
		console.log(searchresultsFact.searchResults, 'this is searchresultsFact.searchResults');

	}]);
