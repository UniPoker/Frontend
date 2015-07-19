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
      controller: function ($scope) {
        $scope.routes = routeNavigation.routes;
        $scope.activeRoute = routeNavigation.activeRoute;
      }
    };
  });
