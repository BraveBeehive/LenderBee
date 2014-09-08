'use strict';

// One of two search results views. This view renders when there is at least 1 item found and returned from the database
angular.module('lenderbee.searchresults', ['lenderbee.services'])
	
	// See services folder for logic
	.controller('searchresultsController', ['$scope', 'searchresultsFact', 'signup', 'searchagain', function($scope, searchresultsFact, signup, searchagain) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data.searchResults in the view".
		$scope.data = searchresultsFact;
		
		// Signup is a function that redirects to Facebook for authentication
		$scope.signup = signup.signup;

		// Searchagain is a function that switches views back to the search bar
		$scope.searchagain = searchagain.searchagain;
		
		// console.log(searchresultsFact.searchResults, 'this is searchresultsFact.searchResults');

	}]);
