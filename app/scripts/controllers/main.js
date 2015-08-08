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

    /**
     * @ngdoc method
     * @name init
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * Function that is called initially on load of main route.
     * If the user is in a room, a leave_room request is send to the server.
     * Anyway list_rooms request is send to server.
     */
    var init = function () {
      if(user.room_id != null && user.room_id != ""){
        socket.send(socket.create_json_string({room_id: user.room_id}, "leave_room"));
      }
      socket.send(socket.create_json_string({}, "list_rooms"));
    }();

    /**
     * @ngdoc method
     * @name list_rooms
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * Requests list_rooms from the server. A handler needs to be registered separately.
     */
    $scope.list_rooms = function () {
      socket.send(socket.create_json_string({}, "list_rooms"));
    };

    /**
     * @ngdoc method
     * @name add_room
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * Requests create_room from the server. A handler needs to be registered separately.
     */
    $scope.add_room = function () {
      socket.send(socket.create_json_string({}, "create_room"));
    };

    /**
     * @ngdoc method
     * @name join_room
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * Requests join_room from the server. A handler needs to be registered separately.
     */
    $scope.join_room = function (room_id) {
      socket.send(socket.create_json_string({room_id: room_id}, "join_room"));
    };

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * # list_rooms_response
     * Registered handler for list_rooms_response.
     * If this handler is triggered, the rooms Array in the response is set to the local rooms variable.
     */
    $scope.$on("list_rooms_response", function (event, data) {
      $scope.rooms = data.body;
      $scope.$apply();
    });

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * # create_room_response
     * Registered handler for create_room_response.
     * If this handler is triggered and the error code is 0, the new room is pushed into the local rooms variable and the view changes to game view.
     * On error it displays a notification with the given error.
     */
    $scope.$on("create_room_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        var room_id = data.body.room_id;
        $scope.rooms.push({"room_id": room_id, "room_seats": 1});
        user.set_room_id(room_id);
        $location.path("/game");
      } else {
        alertify.error(data.message);
      }
      $scope.$apply();
    });

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * # join_room_response
     * Registered handler for join_room_response.
     * If the error code is 0 the room_id of the user is set and the view changes to the game view.
     */
    $scope.$on("join_room_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        user.set_room_id(data.body.room_id);
        //$scope.list_rooms();
        $location.path("/game");
        $scope.$apply();
      }
    });

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:MainCtrl
     * @description
     * # new_rooms_notification
     * Notification send from server. If this notification gets triggered, all rooms get updated.
     */
    $scope.$on("new_rooms_notification", function(event, data){
      $scope.rooms = data.body;
      $scope.$apply();
    });
  });
