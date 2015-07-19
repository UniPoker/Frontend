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
'ngWebsocket'
])
.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        name: 'Main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        name: 'About'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        name: 'Login'
      })
      .when('/test_request', {
        templateUrl: 'views/test_request.html',
        controller: 'TestRequestCtrl',
        name: 'TestRequest'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
