'use strict';

/**
 * @ngdoc directive
 * @name pokerFrontendApp.directive:card
 * @restrict E
 * @function
 *
 * @description
 * # card
 * A card directive that displays a svg image of the given color (color + value). Can be flipped with css animation and comes in two different sizes, normal and mini.
 * @param {boolean} flipped indicates if the card is flipped. Can be changed in real time and the card changes too.
 * @param {String} color represents the value and the color of the card. E.g. 'clubs_3' represents a three of clubs.
 * @param {String} sise represents the size of the card. If 'mini', the card has smaller size and an automatic mouseover zoom.
 * @example
 * <example module="pokerFrontendApp">
 *     <file name="index.html">
 *        <div ng-controller="SampleCtrl">
 *          <card flipped="{{card.flipped}}" color="{{card.color}}_{{card.value}}"></card>
 *        </div>
 *     </file>
 *     <file name="script.js">
 *        angular.module("pokerFrontendApp", ["pokerFrontendApp"])
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
  .directive('card', function () {
    console.log("asdasdasdasdads");
    return {
      templateUrl: '../views/card_template.html',
      restrict: 'E',
      scope: {
        flipped: '@',
        color: '@',
        sise: '@'
      }
    };
  });
