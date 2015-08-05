'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LoginCtrl', function ($scope, $location, socket, user, $mdDialog) {

    $scope.formData = {
      username: 'mustermann',
      password: '123456'
    };
    $scope.submit = function () {
      var user = $scope.formData.username;
      var pw = $scope.formData.password;
      socket.send(socket.create_json_string({"user": user, "password": pw}, "login_user"));
    };

    $scope.register_user = function (event) {
      // creates a modal with the given template and controller
      $mdDialog.show({
        controller: 'RegistrationModalCtrl',
        templateUrl: './views/registration_template.html',
        parent: angular.element(document.body),
        targetEvent: event,
      })
        .then(function (answer) {
          alertify.success("JA");
        }, function () {
          alertify.success("NEIN");
        });
      //var modal_instance = $modal.open({
      //  animation: true,
      //  templateUrl: './views/registration_template.html',
      //  controller: 'RegistrationModalCtrl',
      //  resolve: {
      //    fabFormOptions: function () {
      //      return $scope.defaultFormOptions;
      //    }
      //  }
      //});
      //// to react on the buttons of the modal
      //modal_instance.result.then(function (form_data_user) {
      //  // ok function
      //  socket.send(socket.create_json_string({
      //    name: form_data_user.username,
      //    password: form_data_user.password,
      //    email: form_data_user.email
      //  }, "register_user"));
      //}, function () {
      //  // dismiss function
      //});
    };


    $scope.$on("login_user_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        alertify.success(data.message);
        user.name = $scope.formData.username;
        user.is_logged_in = true;
        $location.path("/main");
      } else {
        alertify.error(data.message);
      }
      $scope.$apply();
    });

    $scope.$on("register_user_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        alertify.success("Erfolgreich Registriert. Bitte email angucken.");
      } else {
        alertify.error(data.message);
      }
      $scope.$apply();
    });
  });
