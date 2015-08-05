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
      //template: '<div></div>',
      restrict: 'A',
      scope: {
        mini: '@'
      },
      link: function (scope, element, attrs) {
        //just for the mini version of cards
        if (scope.mini === "mini") {
          element.on('mouseenter', function () {
            element.parent().parent().parent().parent().parent().css({
              'z-index': 15
            });
            element.addClass('card_hovered');
          });

          element.on('mouseleave', function () {
            element.parent().parent().parent().parent().parent().css({
              'z-index': 1
            });
            element.removeClass('card_hovered');
          });
        }
      }
    };
  });
