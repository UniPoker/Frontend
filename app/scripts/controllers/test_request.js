'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:TestRequestCtrl
 * @description
 * # TestRequestCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('TestRequestCtrl', function ($scope, $rootScope, socket, user) {

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
    $scope.interface_name = "PokerInterface";

    $scope.is_successfull_message = function (message) {
      return socket.is_succesfull_response(message);
    };

    $scope.add_json_value = function () {
      $scope.json_values.push(new Array(2));
    };

    $scope.remove_json_value = function (index) {
      $scope.json_values.splice(index, 1);
    };

    $scope.set_login_json = function () {
      $scope.json_values = [["user", "mustermann"], ["password", "123456"]];
      $scope.json_event = "login_user";
      $scope.interface_name = "PokerInterface";
    };

    $scope.set_join_room = function () {
      $scope.json_values = [["room_id", "1"]];
      $scope.json_event = "join_room";
      $scope.interface_name = "PokerInterface";
    };

    $scope.set_create_room = function () {
      $scope.json_values = [];
      $scope.json_event = "create_room";
      $scope.interface_name = "PokerInterface";
    };

    $scope.set_start_round = function(){
      $scope.json_values = [["room_id", "1"]];
      $scope.json_event = "start_round";
      $scope.interface_name = "PokerInterface";
    };

    $scope.send_json = function () {
      var jsonObj = {
        body: {},
        event: $scope.json_event,
        interface_name: $scope.interface_name
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
      user.is_logged_in = socket.is_succesfull_response(data);
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
