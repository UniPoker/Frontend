'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LogoutCtrl', function ($rootScope, $scope, user, socket, $location) {

    $scope.logout = function(){
      socket.send(socket.create_json_string({}, "logout_user"));
    }();

    $scope.$on("logout_user_response", function(event, data){
      user.logout();
      $location.path('/login');
      $rootScope.$apply();
      //TODO nochmal angucken: cannot read property $$$nextsibling of null
    });
  });
