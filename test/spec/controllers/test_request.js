'use strict';

describe('Controller: TestRequestCtrl', function () {

  // load the controller's module
  beforeEach(module('pokerFrontendApp'));

  var TestRequestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestRequestCtrl = $controller('TestRequestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
