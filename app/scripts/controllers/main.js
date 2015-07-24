'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('MainCtrl', function ($scope, user, socket, $location) {
    //$scope.user = user;

    $scope.rooms = [];

    //trollig, kann nicht $scope.list_rooms() aufrufen
    var init = function () {
      socket.send(socket.create_json_string({}, "list_rooms"));
    }();

    $scope.list_rooms = function () {
      socket.send(socket.create_json_string({}, "list_rooms"));
    };

    $scope.add_room = function () {
      socket.send(socket.create_json_string({}, "create_room"));
    };

    $scope.join_room = function (room_id) {
      socket.send(socket.create_json_string({room_id: room_id}, "join_room"));
    };

    $scope.$on("list_rooms_response", function (event, data) {
      $scope.rooms = data.body;
      $scope.$apply();
    });

    $scope.$on("create_room_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        var room_id = data.body.room_id;
        $scope.rooms.push({"room_id": room_id, "room_seats": 1})
        user.set_room_id(room_id);
        $location.path("/game");
      } else {
        alertify.error(data.message);
      }
      $scope.$apply();
    });

    $scope.$on("join_room_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        user.set_room_id(data.body.room_id);
        //$scope.list_rooms();
        $location.path("/game");
        $scope.$apply();
      }
    });
  });
