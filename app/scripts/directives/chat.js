'use strict';

/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:chat
 * @description
 * # chat
 */
angular.module('pokerFrontendApp')
  .directive('chat', function () {
    return {
      templateUrl: '../views/chat_template.html',
      restrict: 'E',
      scope: {
        title: '@title',
        overlay: '@overlay'
      },
      controller: function ($scope, socket, user) {
        $scope.message = "";
        $scope.messages = [];

        $scope.send_message = function (message) {
          if(message == undefined || message == ""){
            return console.log("LEERE NACHRICHT ABGEFANGEN");
          }
          $scope.message = "";
          var room_id = user.room_id;
          room_id = (room_id == null || room_id == '') ? -1 : room_id;
          socket.send(socket.create_json_string({message: message, room_id: room_id}, "send_message"));
        };

        $scope.$on("send_message_response", function (event, data) {
          if (!socket.is_succesfull_response(data)) {
            alertify.warning("Nachricht konnte nicht gesendet werden.");
          }
        });

        $scope.$on("chat_notification", function(event, data){
          var date = new Date();
          var body = data.body;
          var sender = body.sender;
          var sender_color = (sender == user.name) ? "color_green" : "color_red";
          var message = {
            message: body.message,
            date: date,
            sender: sender,
            sender_color: sender_color
            //room_id: body.room_id
          };
          $scope.messages.push(message);
          scroll_to_bottom();
          $scope.$apply();
        });

        $scope.$on("action_performed_notification", function(event, data){
          var date = new Date();
          var body = data.body;
          var sender = body.sender;
          var sender_color = "color_blue";
          var message = {
            message: body.message,
            date: date,
            sender: sender,
            sender_color: sender_color
            //room_id: body.room_id
          };
          $scope.messages.push(message);
          scroll_to_bottom();
          $scope.$apply();
        });

        function scroll_to_bottom (){
          var body = $('#chat_body');
          body.animate({
            scrollTop: body[0].scrollHeight
            //scrollTop: $('#your-id').offset().top
            //scrollTop: $('.your-class').offset().top
          }, 'slow');
        }
      }
    };
  });
