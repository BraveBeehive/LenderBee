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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
