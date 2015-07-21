'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:RegistrationModalCtrl
 * @description
 * # RegistrationModalCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('RegistrationModalCtrl', function ($scope, $modalInstance, ngFabForm, fabFormOptions) {
    $scope.defaultFormOptions = fabFormOptions;

    $scope.formData = {
      username: '',
      password: '',
      email: ''
    };

    $scope.ok = function () {
      $modalInstance.close($scope.formData);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
