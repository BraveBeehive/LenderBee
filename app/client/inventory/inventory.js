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
  .value('Session', {user: 'Tommy'})
  .factory('Inventory', ['Session', '$http', '$location', function(Session, $http, $location) {
    var inventory = {};
    // GET user's inventory via $http server request; returns a promise.
    inventory.refresh = function() {
      return $http({
        method: 'GET',
        url: 'api/inventory/show',
        data: {'user': Session.user}
      }).then(function(response, error) {
        if (error) { throw error; }
        inventory.items = response.data;
      });;
    }
    
    // Item-User interactions; should use $http server requests eventually.
    // Add item to inventory.
    inventory.add = function(name){
      var newItem = {
                      name: name,
                      owner: Session.user, 
                      possessor: Session.user,
                      isRequested: false
                    };
      console.log('adding:',newItem);
      //TEMP: push item directly to inventory items array.
      // inventory.items.push(newItem);

      return $http({
        method: 'POST',
        url: '/api/inventory/add',
        data: {'item': newItem}
      });

    };
    // Borrow an item; just redirects to /searchbar view.
    inventory.borrow = function(){
      $location.path('/searchbar');
    };
    // Delete an item. (owner === user === possessor)
    inventory.delete = function(item){
      console.log('deleting:',item.name);
      // TEMP: find the item in inventory items array and splice it out.
      inventory.items.splice(inventory.items.indexOf(item), 1);
    };
    // Lend a requested item. (owner === user === possessor)
    inventory.lend = function(item){
      console.log('lending:',item.name);
    };
    // Return a borrowed item. (owner !== user === possessor)
    inventory.return = function(item){
      console.log('returning:',item.name)
    };
    // Demand a lent item back. (owner === user !== possessor)
    inventory.demand = function(item){
      console.log('demanding:',item.name)
    };

    return inventory;
  }])
  .controller('InventoryCtrl', function($scope, Inventory, Session){
    $scope.refresh = function(){Inventory.refresh().then(function(){
      $scope.items = Inventory.items;
    });};
    $scope.add = function(){Inventory.add(prompt('What would you like to lend?'));};
    $scope.borrow = Inventory.borrow;
    $scope.currentUser = Session.user;
    $scope.refresh();
  })
  .controller('ItemCtrl', function($scope, Inventory){
    $scope.delete = Inventory.delete;    
    $scope.lend = Inventory.lend;
    $scope.return = Inventory.return;
    $scope.demand = Inventory.demand;    
  });
