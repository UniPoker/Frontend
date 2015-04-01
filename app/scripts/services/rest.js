'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.rest
 * @description
 * # rest
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('rest', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  this.post = function (body, succes_callback, error_callback){
    $http.post('http://google.de', body).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        console.log("123456");
        succes_callback(data);
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        error_callback(data);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  });
