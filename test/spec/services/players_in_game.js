'use strict';

describe('Service: playersInGame', function () {

  // load the service's module
  beforeEach(module('pokerFrontendApp'));

  // instantiate service
  var playersInGame;
  beforeEach(inject(function (_playersInGame_) {
    playersInGame = _playersInGame_;
  }));

  it('should do something', function () {
    expect(!!playersInGame).toBe(true);
  });

});
