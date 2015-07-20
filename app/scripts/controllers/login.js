'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LoginCtrl', function ($scope, $rootScope, ngFabForm, $location, socket, user) {

    $scope.formData = {
      username: 'mustermann',
      password: '123456'
    };

    $scope.submit = function () {
      var user = $scope.formData.username;
      var pw = $scope.formData.password;
      socket.send(socket.create_json_string({"user": user, "password": pw}, "login_user"));
    };

    $scope.register_user = function (pw, username) {
      socket.send(socket.create_json_string({"password": pw, "name": username}, "register_user"));
    };

    $scope.defaultFormOptions = ngFabForm.config;

    $scope.$on("login_user_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        user.name = $scope.formData.username;
        user.is_logged_in = true;
        $location.path("/main");
      } else {
        alertify.error("Login nicht erfolgreich");
      }
    });

    $scope.$on("register_user_response", function(event, data){
      if(socket.is_succesfull_response(data)){
        $scope.submit();
      }else{
        alertify.error("Nutzer konnte nicht angelegt werden");
      }
    });
  });
