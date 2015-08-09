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
 */
angular.module('pokerFrontendApp')
  .directive('card', function () {
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
