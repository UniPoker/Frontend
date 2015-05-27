'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.socket
 * @description
 * # socket
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('socket', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.webSocket = new WebSocket(
      'ws://localhost:8080/poker/websocket');

    webSocket.onerror = function (event) {
      $rootScope.$broadcast("onError", event.data);
    };

    webSocket.onopen = function (event) {
      $rootScope.$broadcast("onOpen", event);
    };

    webSocket.onmessage = function (event) {
      $rootScope.$broadcast("onMessage", event);
    };

    this.send = function(data){
      webSocket.send(data);
    };

  });
