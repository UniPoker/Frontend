'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:TestRequestCtrl
 * @description
 * # TestRequestCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('TestRequestCtrl', function ($scope, $rootScope, socket) {

    $scope.status_classes = {
      //css classes
      0: 'socket_pending',
      1: 'socket_active',
      3: 'socket_error'
    };
    $scope.messages = new Array();
    $scope.status = socket.get_state();

    $scope.json_values = new Array(new Array(2));
    $scope.json_event = '';


    $scope.add_json_value = function () {
      $scope.json_values.push(new Array(2));
    };

    $scope.remove_json_value = function (index) {
      $scope.json_values.splice(index, 1);
    };

    $scope.set_login_json = function () {
      $scope.json_values = [["user", "mustermann"], ["password", "123456"]];
      $scope.json_event = "login_user";
    };

    $scope.send_json = function () {
      var jsonObj = {
        body: {},
        event: $scope.json_event
      };
      //build body
      for (var i = 0; i < $scope.json_values.length; i++) {
        jsonObj.body[$scope.json_values[i][0]] = $scope.json_values[i][1]
      }
      jsonObj = JSON.stringify(jsonObj);
      console.log(jsonObj);
      $scope.sendSocket(jsonObj);
    };

    $scope.sendSocket = function (message) {
      console.log("data send: ", message);
      socket.send(message);
    };

    $scope.$on("onMessage", function (event, data) {
      $scope.messages.push(data);
      $scope.$apply();
    });

    $scope.$on("login_user_response", function (event, data) {
      console.log("login_user_response: ", data);
    });

    $scope.$on("error_response", function (event, data) {
      console.log("error: ", data);
    });

    $scope.$on("onError", function (event, data) {
      $scope.status = socket.get_state();
      $scope.$apply();
    });

    $scope.$on("onOpen", function (event, data) {
      $scope.status = socket.get_state();
      $scope.$apply();
    });
  });
