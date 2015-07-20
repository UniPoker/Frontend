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

    var webSocket = new WebSocket(
      'ws://192.168.0.139:8080/events/');///poker/websocket');

    webSocket.onerror = function (event) {
      console.log("OnError", event);
      $rootScope.$broadcast("onError", event.data);
    };

    webSocket.onopen = function (event) {
      console.log("OnOpen", event);
      $rootScope.$broadcast("onOpen", event);
    };

    webSocket.onmessage = function (event) {
      console.log("OnMessage ", event.data);
      var data = JSON.parse(event.data);
      $rootScope.$broadcast(data.event, data);
      $rootScope.$broadcast("onMessage", data); //just for test_request
    };

    this.send = function (data) {
      webSocket.send(data);
    };

    this.get_state = function () {
      return webSocket.readyState;
    };

    this.is_open = function(){
      return this.get_state() == 1;
    };

  });
