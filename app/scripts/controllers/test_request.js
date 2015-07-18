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

    $scope.messages = new Array();
    $scope.json_values = new Array(new Array(2));

    $scope.add_json_value = function () {
      $scope.json_values.push(new Array(2));
    };

    $scope.remove_json_value = function (index) {
      $scope.json_values.splice(index, 1);
    };

    $scope.set_login_json = function () {
      $scope.json_values = [["name", "mustername"], ["password", "123456"]]
    };

    $scope.send_json = function () {
      var jsonObj = {};
      for (var i = 0; i < $scope.json_values.length; i++) {
        jsonObj[$scope.json_values[i][0]] = $scope.json_values[i][1]
      }
      jsonObj = JSON.stringify(jsonObj);
      $scope.sendSocket(jsonObj);
    };

    $scope.sendSocket = function (message) {
      console.log("data send: ", message);
      socket.send(message);
    };

    $rootScope.$on("onMessage", function (event, data) {
      $scope.messages.push(data);
      $scope.$apply();
    });

  });
