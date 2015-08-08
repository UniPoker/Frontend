'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LoginCtrl', function ($scope, ngFabForm, $location, socket, user, $modal) {

    $scope.defaultFormOptions = ngFabForm.config;

    $scope.formData = {
      username: 'mustermann',
      password: '123456'
    };

    /**
     * @ngdoc method
     * @name submit
     * @methodOf pokerFrontendApp.controller:LoginCtrl
     * @description
     * Represents the submit function of the login form. It reads the inputs username and password.
     * Also sends login_user request to server.
     */
    $scope.submit = function () {
      var user = $scope.formData.username;
      var pw = $scope.formData.password;
      socket.send(socket.create_json_string({"user": user, "password": pw}, "login_user"));
    };

    /**
     * @ngdoc method
     * @name register_user
     * @methodOf pokerFrontendApp.controller:LoginCtrl
     * @description
     * Initializes a modal screen to register a new user.
     * On successful input the following attributes will be read:
     * - username
     * - password
     * - email
     * Also register_user request is send to server and a handler needs to be registered.
     */
    $scope.register_user = function () {
      // creates a modal with the given template and controller
      var modal_instance = $modal.open({
        animation: true,
        templateUrl: './views/registration_template.html',
        controller: 'RegistrationModalCtrl',
        resolve: {
          fabFormOptions: function () {
            return $scope.defaultFormOptions;
          }
        }
      });
      // to react on the buttons of the modal
      modal_instance.result.then(function (form_data_user) {
        // ok function
        socket.send(socket.create_json_string({
          name: form_data_user.username,
          password: form_data_user.password,
          email: form_data_user.email
        }, "register_user"));
      }, function () {
        // dismiss function
      });
    };

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:LoginCtrl
     * @description
     * # login_user_response
     * Registered handler for the login_user_response.
     * If is successful response the {@link pokerFrontendApp.user user} service gets logged in and its username set.
     * On error response, a notification displays the error message.
     */
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

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:LoginCtrl
     * @description
     * # register_user_response
     * Registered handler for the register_user_response.
     * A notification with the result will be displayed.
     */
    $scope.$on("register_user_response", function (event, data) {
      if (socket.is_succesfull_response(data)) {
        alertify.success("Erfolgreich Registriert. Bitte email angucken.");
      } else {
        alertify.error(data.message);
      }
      $scope.$apply();
    });
  });
