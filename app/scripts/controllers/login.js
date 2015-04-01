'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LoginCtrl', function ($scope, ngFabForm) {

    $scope.submit = function ()
    {
    };
    $scope.defaultFormOptions = ngFabForm.config;

  });
