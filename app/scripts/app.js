'use strict';

function create_leave_modal($modal, next, $rootScope, $location) {
  var modal_instance = $modal.open({
    animation: true,
    templateUrl: './views/leave_game_modal.html',
    controller: function ($scope, $modalInstance, target_route) {
      $scope.ok = function () {
        $modalInstance.close(target_route);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss(target_route);
      };
    },
    resolve: {
      target_route: function () {
        return next.$$route.originalPath;
      }
    }
  });
  // to react on the buttons of the modal
  modal_instance.result.then(function (target_route) {
    // ok function
    console.log("OK FUNCTION ", target_route);
    $rootScope.left_game_route_through_modal = true;
    $location.path(target_route);
  }, function () {
    // dismiss function
  });
}
/**
 * @ngdoc overview
 * @name pokerFrontendApp
 * @description
 * # pokerFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('pokerFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngFabForm',
    'ui.bootstrap'
  ])
  .run(function ($rootScope, $location, user, $modal) {
    $rootScope.left_game_route_through_modal = false;
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next && next.$$route && next.$$route.originalPath == "/game"){
        $rootScope.left_game_route_through_modal = false;
      }
      if (next.requireLogin !== undefined) {
        if (next.requireLogin && !user.is_logged_in) {
          event.preventDefault();
          $location.path("/login");
        } else if (current && current.$$route && current.$$route.originalPath == "/game") {
          if (!$rootScope.left_game_route_through_modal) {

            event.preventDefault();
            create_leave_modal($modal, next, $rootScope, $location);
          }
        }
      }
    });
  })
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        name: 'Main',
        requireLogin: true
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        requireLogin: true
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        name: 'About',
        requireLogin: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        name: 'Login',
        requireLogin: false
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        name: 'Logout',
        requireLogin: true
      })
      .when('/test_request', {
        templateUrl: 'views/test_request.html',
        controller: 'TestRequestCtrl',
        name: 'TestRequest',
        requireLogin: false
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
