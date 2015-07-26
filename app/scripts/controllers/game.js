'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('GameCtrl', function ($scope) {
    $scope.test_flipped = false;

    $scope.flip_it = function(){
      $scope.test_flipped = !$scope.test_flipped;
    };
  });
