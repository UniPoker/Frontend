'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.routeNavigation
 * @description
 * # routeNavigation
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('routeNavigation', function($route, $location) {
    var routes = [];
    angular.forEach($route.routes, function (route, path) {
      if (route.name) {
        routes.push({
          path: path,
          name: route.name,
          requireLogin: route.requireLogin
        });
      }
    });

    return {
      routes: routes,
      activeRoute: function (route) {
        return route.path === $location.path();
      }
    };
  });
