'use strict';

describe('Controller: RegistrationModalCtrl', function () {

  // load the controller's module
  beforeEach(module('pokerFrontendApp'));

  var RegistrationModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationModalCtrl = $controller('RegistrationModalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
