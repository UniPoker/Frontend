'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('LoginCtrl', function ($scope, ngFabForm, rest) {

    $scope.submit = function ()
    {
      rest.post("{'test':'test'}", function(data){
        console.log(data);
      });
    };
    $scope.defaultFormOptions = ngFabForm.config;

  });
