'use strict';

/**
 * @ngdoc function
 * @name lenderBeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventory lenderBeeApp
 */

angular.module('lenderbee.inventory',[])
  // Temp value to indicate current authenticated user.
  .value('Session', {user: 'Jonathan'})
  .factory('Inventory', ['Session', '$http', '$location', function(Session, $http, $location) {
    var inventory = {};
    // Item-User interactions; should use $http server requests eventually.
    // GET user's inventory via $http server request; returns a promise.
    inventory.refresh = function() {
      return $http({
        method: 'GET',
        url: 'api/inventory/show',
        data: {'user': Session.user}
      }).then(function(response, error) {if (error) { throw error; }
        inventory.items = response.data;
      });
    };
    // Add item to inventory.
    inventory.add = function(name){
      var newItem = {
                      name: name,
                      owner: Session.user, 
                      possessor: Session.user,
                      isRequested: false
                    };
      return $http({
        method: 'POST',
        url: '/api/inventory/add',
        data: {'item': newItem}
      });
    };
    // Delete an item. (owner === user === possessor)
    inventory.delete = function(item){
      return $http({
        method: 'POST',
        url: '/api/inventory/remove',
        data: {'item': item}
      });
    };
    // Lend a requested item. (owner === user === possessor)
    inventory.lend = function(item){
      console.log('lending:',item.name);
    };
    // Return a borrowed item. (owner !== user === possessor)
    inventory.return = function(item){
      console.log('returning:',item.name);
    };
    // Demand a lent item back. (owner === user !== possessor)
    inventory.demand = function(item){
      console.log('demanding:',item.name);
    };
    // Borrow an item; just redirects to /searchbar view.
    inventory.borrow = function(){
      $location.path('/searchbar');
    };

    return inventory;
  }])
  .controller('InventoryCtrl', function($scope, Inventory, Session){
    // After GET resolves, can assign inventory items to scope.
    $scope.refresh = function(){Inventory.refresh().then(function(){
      $scope.items = Inventory.items;
    });};
    // After POST resolves, refresh inventory items.
    $scope.add = function(){
      Inventory.add(window.prompt('What would you like to lend?')).then(
      // Note: .then(successCallback(value), errorCallback(reason))
        $scope.refresh
      );
    };
    $scope.borrow = Inventory.borrow;
    $scope.currentUser = Session.user;
    $scope.refresh();
  })
  .controller('ItemCtrl', function($scope, Inventory){
    $scope.delete = function(){
      Inventory.delete($scope.item).then($scope.$parent.refresh);
    };    
    $scope.lend = Inventory.lend;
    $scope.return = Inventory.return;
    $scope.demand = Inventory.demand;    
  });
