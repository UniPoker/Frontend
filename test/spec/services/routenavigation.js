'use strict';

describe('Service: routeNavigation', function () {

  // load the service's module
  beforeEach(module('pokerFrontendApp'));

  // instantiate service
  var routeNavigation;
  beforeEach(inject(function (_routeNavigation_) {
    routeNavigation = _routeNavigation_;
  }));

  it('should do something', function () {
    expect(!!routeNavigation).toBe(true);
  });

});
