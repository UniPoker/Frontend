'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.socket
 * @description
 * # socket
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('socket', function ($websocket) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var ws = $websocket.$new('ws://localhost:12345');


  });
