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
      link: function (scope, element, attrs) {
        //just for the mini version of cards
        var height = 0;

        element.on('mouseenter', function(){
          console.log("ENTER", element, element.parent);
          height = element.height();
          element.css({
            height:  90 + 'px',
            'z-index': 15
          });
        });

        element.on('mouseleave', function(){
          element.css({
            height:  height + 'px',
            'z-index': 0
          });
        });
      }
    };
  });
