'use strict';

//TODO refactor into the card directive
/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:cardZoom
 * @restrict A
 * @element img
 * @description
 * # cardZoom
 * An extension of the card directive to zoom in on the card, if the size is 'mini'.
 * @param {String} mini If the size is 'mini' than a mouseenter/leave listener is registered to animate a zoom factor on the svg image of the card.
 * @example
 * <example module="pokerFrontendApp">
 *     <file name="index.html">
 *        <div ng-controller="SampleCtrl">
 *            {{card}}
 *          <card sise="mini" flipped="{{card.flipped}}" color="{{card.color}}_{{card.value}}"></card>
 *        </div>
 *     </file>
 *     <file name="script.js">
 *        angular.module("pokerFrontendApp", [])
 *                .controller('SampleCtrl', function ($scope) {
 *                    $scope.card = {
 *                      flipped: true,
 *                      color: 'clubs',
 *                      value: '3'
 *                    };
 *                });
 *     </file>
 * </example>
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
