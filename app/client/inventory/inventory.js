app
  // .factory('InventoryFactory', function(){})
  .controller('InventoryCtrl', ['$scope', function(){


  }]);




'use strict';

/**
 * @ngdoc function
 * @name lenderBeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lenderBeeApp
 */
angular.module('lenderBeeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
