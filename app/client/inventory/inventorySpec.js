'use strict';

describe('Controller: InventoryCtrl', function () {

  // load the controller's module
  beforeEach(module('lenderBeeApp'));

  var InventoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventoryCtrl = $controller('InventoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach an inventory of items to the scope', function () {
    expect(scope.inventory.length).toBe(3);
  });

  it('should know an inventory item has a name', function () {
    expect(scope.inventory[0].name).not.toBe(null);
  });


  it('should know an inventory item has an owner', function () {
    expect(scope.inventory[0].owner).not.toBe(null);
  });

  it('should know an inventory item has a possessor', function () {
    expect(scope.inventory[0].possessor).not.toBe(null);
  });

  // it('should contain a searchService',
  //    inject(function(searchService) {
  //         expect(searchService).not.to.equal(null);
  // }));

  // it('should contain two search options',
  //     inject(function(searchService) {
  //         expect(searchService.getSearchOptions()).to.equal(2);
  // }));
});