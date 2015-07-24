'use strict';

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
  .run(function ($rootScope, $location, user) {
    $rootScope.$on('$routeChangeStart', function(event, next){
      if(next.requireLogin !== undefined){
        if(next.requireLogin && !user.is_logged_in){
          event.preventDefault();
          $location.path("/login");
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
