'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:RegistrationModalCtrl
 * @description
 * # RegistrationModalCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('RegistrationModalCtrl', function ($scope, $mdDialog) {
    $scope.formData = {
      username: '',
      password: '',
      email: ''
    };

    $scope.ok = function () {
      $mdDialog.hide($scope.formData);
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  });
