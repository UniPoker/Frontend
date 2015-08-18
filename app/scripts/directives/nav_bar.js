'use strict';

/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('pokerFrontendApp')
  .directive('navBar', function (routeNavigation) {
    return {
      templateUrl: '../views/nav_bar.html',
      restrict: 'E',
      controller: function ($scope, user, $location) {
        //$scope.user = user;
        $scope.routes = routeNavigation.routes;
        $scope.activeRoute = routeNavigation.activeRoute;
        $scope.show_route = function (route) {
          if (user.is_logged_in) {
            if (route.name == 'Login') {
              return false;
            } else {
              return true;
            }
          } else {
            return !route.requireLogin;
          }
        };
        $scope.getRouteName = function () {
          return routeNavigation.getActiveRoute();
        };
        $scope.clickRoute = function (path) {
          $location.path(path);
        };
      }
    };
  });
