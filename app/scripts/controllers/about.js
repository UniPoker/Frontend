'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
