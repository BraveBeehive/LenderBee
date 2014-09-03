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
    expect(typeof(scope.search)).toEqual("function");
  });


});
