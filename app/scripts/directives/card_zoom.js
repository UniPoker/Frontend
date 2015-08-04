'use strict';

/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:cardZoom
 * @description
 * # cardZoom
 */
angular.module('pokerFrontendApp')
  .directive('cardZoom', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the cardZoom directive');
      }
    };
  });
