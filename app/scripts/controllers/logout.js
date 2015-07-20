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
    var logout_json = {
      "event": "logout_user",
      "body": {}
    };

    $scope.logout = function(){
      socket.send(JSON.stringify(logout_json));
    }();

    $scope.$on("logout_user_response", function(event, data){
      user.logout();
      $location.path('/login');
      $rootScope.$apply();
      //TODO nochmal angucken: cannot read property $$$nextsibling of null
    });
  });
