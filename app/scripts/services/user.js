'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.user
 * @description
 * # user
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('user', function () {
    this.user_name = ''; //mustermann, pw: 123456
    this.room_id = null;
    this.is_logged_in = false;

    this.logout = function () {
      this.reset_vars();
    };

    this.reset_vars = function () {
      this.user_name = '';
      this.room_id = '';
      this.is_logged_in = false;
    };

    this.set_room_id = function (room_id) {
      console.log("SET ROOM ID");
      this.room_id = parseInt(room_id);
    }
  });
