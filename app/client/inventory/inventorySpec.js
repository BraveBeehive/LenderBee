'use strict';
// NOTE expect(value).toBe(value) !== expect(object).toEqual(object)
describe('Inventory', function () {
  // Load the app.
  beforeEach(module('lenderBeeApp'));

  describe('Factory: Inventory', function(){
    // Inject the Inventory factory and make it available to tests via closure. 
    var inventory;
    beforeEach(inject(function(Inventory){
      inventory = Inventory;
    }));

    it('should return an object', function(){
      expect(inventory).toBeDefined();
    });
    it('should have a list of items', function(){
      inventory.refresh().then(function(){
        expect(inventory.items).toBeDefined();
        expect(Array.isArray(inventory.items)).toBe(true);
      });
    });
    it('should have methods: refresh, add, borrow, delete, lend, return, demand', function(){
      expect(typeof inventory.refresh).toBe('function');
      expect(typeof inventory.add).toBe('function');
      expect(typeof inventory.borrow).toBe('function');
      expect(typeof inventory.delete).toBe('function');
      expect(typeof inventory.lend).toBe('function');
      expect(typeof inventory.return).toBe('function');
      expect(typeof inventory.demand).toBe('function');
      expect(inventory.notAMethod).toBeUndefined();
    });
  });

  describe('Controller: InventoryCtrl', function () {
    // Initialize the controller and a mock scope
    var scope;
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      $controller('InventoryCtrl', {
        $scope: scope
      });
    }));
    it('should attach items to the scope'/*, function () {
      scope.refresh().then(function(){
        expect(scope.items).toBeDefined();
      });
    }*/);
    it('can add an inventory item'/*, function () {
      var previousLength = scope.items.length;
      scope.add('testItem').then(function(){
        expect(scope.items.length).toBe(previousLength+1);
      });
    }*/);    
    it('inventory item has a name, owner, possessor, and isRequested boolean'/*, function () {
      inventory.refresh().then(function(){
        expect(typeof scope.items[0].name).toBe("string");
        expect(typeof scope.items[0].owner).toBe("string");
        expect(typeof scope.items[0].possessor).toBe("string");
        expect(typeof scope.items[0].isRequested).toBe("boolean");
      });
    }*/);
  });

  describe('Controller: ItemCtrl', function () { 
    // Initialize the controller and a mock scope
    var scope;
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      $controller('ItemCtrl', {
        $scope: scope
      });
    }));
   
    it('can delete an inventory item');    
    it('can lend an item');
    it('can return an item');
    it('can demand an item back');
  });
});
