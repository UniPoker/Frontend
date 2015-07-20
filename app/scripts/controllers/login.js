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
      console.log("submit");
      var user = $scope.formData.username;
      var pw = $scope.formData.password;
      socket.send(JSON.stringify({"body": {"user": user, "password": pw}, "event": "login_user"}));
    };

    $scope.defaultFormOptions = ngFabForm.config;

    $scope.$on("login_user_response", function (event, data) {
      if (is_succesfull_response(data)) {
        user.name = $scope.formData.username;
        user.is_logged_in = true;
        $location.path("/main");
      } else {
        alertify.error("Login nicht erfolgreich");
      }
    });

    var is_succesfull_response = function (data) {
      if (data.status == 0) {
        return true;
      } else {
        return false;
      }
    };

    //function onMessage(event) {
    //  console.log(event);
    //  var data = JSON.parse(event.data);
    //  if(data.status){
    //    $location.path("/main")
    //  }
    //}
  });
