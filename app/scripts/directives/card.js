'use strict';

/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:card
 * @description
 * # card
 */
angular.module('pokerFrontendApp')
  .directive('card', function () {
    return {
      templateUrl: '../views/card_template.html',
      restrict: 'E',
      scope: {
        flipped: '@'
      }
    };
  });
