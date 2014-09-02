angular.module('searchresults', [])
	
	.controller('srController', ['$scope', 'searchresultsFact', function($scope, searchresultsFact) {
		// Since $scope.data is equal to the returned object of searchresultsFact, we can access every model by saying something like "item in data".
		$scope.data = searchresultsFact;
		$scope.test = "hello i'm here!";
		console.log($scope.data, "this is scope.data");

		/*

		$scope.getSearchResults = function() {
			// Returns a promise that I can then store to $scope.data
			searchResultsFact.getSearchResults
				.then(function(data) {
					// What this does is it sets a property in the $scope.data that has a results property equal to the array of search results objects coming back from the server
					$scope.data.results = data; 
				})
		}

		*/

	}])


	.factory('searchresultsFact', ['$http', function($http) {
		// This is where I would require the $http dependency and write my ajax methods here
		var results = {};

		results.getSearchResults = function() {
			// $http ajax call to the server to get searchResults
			// Returns a promise and then send it over to the controller? Or does the logic have to be in the controller?
			return $http({
				method: "GET",
				url: '/api/something'
			})
			.then(function(err, resp) {
				if (err) {
					throw err;
				}
				this.searchResults = resp.data;
				return resp.data;
			});
		};

		return {
			searchResults: [
				{
					itemid: 9,
					itemdescription: "legit power drill",
					tags: ["powertool", "goodcondition"],
					distance: .5
				},
				{
					itemid: 25,
					itemdescription: "Black and Decker Power Drill",
					tags: ["powertool", "almostnew"],
					distance: 1.2
				},
				{
					itemid: 356,
					itemdescription: "working power drill; low voltage",
					tags: ["powertool", "savepower"],
					distance: .3
				}
			]
		}
	}]);