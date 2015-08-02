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
    $rootScope.disabled = true;

    var INTERFACE_NAME = "PokerInterface";

    var websocket_url = 'ws://192.168.0.139:8080/events/';//  192.168.0.139:8080
    var webSocket = new WebSocket(websocket_url);

    webSocket.onerror = function (event) {
      console.log("OnError", event);
      $rootScope.$broadcast("onError", event.data);
    };

    webSocket.onopen = function (event) {
      console.log("OnOpen", event);
      $rootScope.$apply(function(){
        $rootScope.disabled = false;
      });
      $rootScope.$broadcast("onOpen", event);
    };

    webSocket.onmessage = function (event) {
      var data = JSON.parse(event.data);
      if (data.status == 0) {
        console.log("OnMessage ", data);
      } else {
        console.error("OnMessage ", data);
      }
      $rootScope.$broadcast(data.event, data);
      $rootScope.$broadcast("onMessage", data); //just for test_request
    };

    this.send = function (data) {
      console.log("Sending request: ", data);
      webSocket.send(data);
    };

    this.get_state = function () {
      return webSocket.readyState;
    };

    this.is_open = function () {
      return this.get_state() == 1;
    };

    /**
     * creates a string for WebSocket to send.
     * @param {Object} body the given body for the JSON
     * @param {String} event the given event for the JSON
     */
    this.create_json_string = function (body, event) {
      return JSON.stringify({
        "body": body,
        "event": event,
        "interface_name": INTERFACE_NAME
      });
    };

    this.is_succesfull_response = function (response) {
      if (response.status == 0) {
        return true;
      } else {
        return false;
      }
    };
  });
