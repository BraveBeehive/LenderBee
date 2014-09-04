'use strict';

/**
 * @ngdoc function
 * @name lenderBeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventory lenderBeeApp
 */

angular.module('lenderbee.inventory',[])
  .factory('Inventory', function(){
    // console.log('Inventory factory loaded!');
    return [
        {
          name: 'spork',
          owner: 'Tommy', 
          possessor: 'Tommy',
          isRequested: true

        },
        {
          name: 'bike',
          owner: 'Tommy', 
          possessor: 'Tommy',
          isRequested: false
        },
        {
          name: 'headphones',
          owner: 'Tommy', 
          possessor: 'Jonathan',
          isRequested: false
        },
        {
          name: 'headphones',
          owner: 'Collin', 
          possessor: 'Jonathan',
          isRequested: false
        }
      ];
  })
  .controller('InventoryCtrl', function($scope, Inventory){
    // console.log('InventoryCtrl loaded!');
    $scope.inventory = Inventory;
    $scope.add = function(){console.log('add');};
    $scope.borrow = function(){console.log('borrow');};
    $scope.currentUser = 'Tommy';
  })
  .controller('ItemCtrl', function($scope){
    $scope.lend = function(){console.log('lend');};
    $scope.return = function(){console.log('return');};
    $scope.demand = function(){console.log('demand');};    
  });
