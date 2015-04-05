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

    var webSocket = new WebSocket(
      'ws://192.168.0.139:8080/poker/websocket');

    webSocket.onerror = function (event) {
      onError(event)
    };

    webSocket.onopen = function (event) {
      onOpen(event)
    };

    webSocket.onmessage = function (event) {
      onMessage(event)
    };

    function onMessage(event) {
     console.log("12345", event)
    }

    function onOpen(event) {
      document.getElementById('messages').innerHTML = 'Now Connection established';
    }

    function onError(event) {
      alert(event.data);
    }

    function start() {
      var text = document.getElementById("userinput").value;

      webSocket.send(text);
      return false;
    }

  });
