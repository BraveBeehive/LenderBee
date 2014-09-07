'use strict';

describe('Controller: searchresultsController', function () {

  // load the controller's module
  beforeEach(module('lenderBeeApp'));

  var searchresultsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    searchresultsController = $controller('searchresultsController', {
      $scope: scope
    });
  }));

  it('should return an object ', function () {
    expect(typeof(scope.data)).toEqual('object');
  });

  it('should contain an item description property', function() {
    expect(scope.data.itemdescription).not.toBe(null);
  });

  it('should contain a distance property', function() {
    expect(scope.data.distance).not.toBe(null);
  });

});
