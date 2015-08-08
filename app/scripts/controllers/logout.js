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

    /**
     * @ngdoc method
     * @name logout
     * @methodOf pokerFrontendApp.controller:LogoutCtrl
     * @description
     * Requests a logout from the server.
     */
    $scope.logout = function(){
      socket.send(socket.create_json_string({}, "logout_user"));
    }();

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:LogoutCtrl
     * @description
     * # logout_user_response
     * Response handler for logout_user_response.
     * If this handler is triggered, the user gets logged out and the login route is displayed.
     */
    $scope.$on("logout_user_response", function(event, data){
      user.logout();
      $location.path('/login');
      $rootScope.$apply();
      //TODO nochmal angucken: cannot read property $$$nextsibling of null
    });
  });
