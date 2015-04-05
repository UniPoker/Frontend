'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LoginCtrl', function ($scope, ngFabForm, rest, $location) {

    var webSocket = new WebSocket(
      'ws://192.168.0.139:8080/poker/websocket');


    $scope.submit = function () {
            console.log("submit");
      webSocket.send(JSON.stringify({"body":{"user":"123456789"}, "event" : "login_user"}));


    };
    $scope.defaultFormOptions = ngFabForm.config;

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
      console.log(event);
      var data = JSON.parse(event.data);
      if(data.status){
        $location.path("/main")
      }
    }

    function onOpen(event) {
      console.log("onOpen", event);
    }

    function onError(event) {
      console.log("onError",event);
    }


  });
