'use strict';

/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('pokerFrontendApp')
  .directive('navBar', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the navBar directive');
      }
    };
  });
