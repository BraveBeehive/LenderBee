/**
 * @ngdoc function
 * @name lenderBeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventory lenderBeeApp
 */

app
  .factory('Inventory', function(){
    console.log('Inventory loaded!');
    return [
        {
          name: "spork",
          owner: "Tommy", 
          possessor: "Tommy"
        },
        {
          name: "bike",
          owner: "Tommy", 
          possessor: "Collin"
        },
        {
          name: "headphones",
          owner: "Tommy", 
          possessor: "Jonathan"
        }
      ];
  })
  .controller('InventoryCtrl', function($scope, Inventory){
    $scope.inventory = Inventory;
  });
