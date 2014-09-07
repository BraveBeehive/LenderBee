'use strict';

describe('Controller: searchbarController', function () {

  // load the controller's module
  beforeEach(module('lenderBeeApp'));

  var searchbarController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    searchbarController = $controller('searchbarController', {
      $scope: scope
    });
  }));

  it('should be a function', function () {
    expect(typeof(scope.searchItem)).toEqual('function');
  });

  it('searchQuery should be an object', function() {
    expect(typeof(scope.searchQuery)).toEqual('object');
  });

  // A good test is that searchItems should redirect page after query finishes

});
