'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:RegistrationModalCtrl
 * @description
 * # RegistrationModalCtrl
 * Controller for the Registration Modal.
 * Handles the form data and success or error functions.
 */
angular.module('pokerFrontendApp')
  .controller('RegistrationModalCtrl', function ($scope, $modalInstance, ngFabForm, fabFormOptions) {
    $scope.defaultFormOptions = fabFormOptions;

    $scope.formData = {
      username: '',
      password: '',
      email: ''
    };

    /**
     * @ngdoc method
     * @name ok
     * @methodOf pokerFrontendApp.controller:RegistrationModalCtrl
     * @description
     * Is triggered from the view and tells the open modal that the user accepted the form.
     */
    $scope.ok = function () {
      $modalInstance.close($scope.formData);
    };

    /**
     * @ngdoc method
     * @name cancel
     * @methodOf pokerFrontendApp.controller:RegistrationModalCtrl
     * @description
     * Is triggered from the view and tells the open modal that the user declined the form.
     */
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
