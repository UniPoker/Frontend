'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.playersInGame
 * @description
 * # playersInGame
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('playersInGame', function () {
    this.all = [];

    this.add_player = function (player_json) {
      //TODO erweitern um small/big blind und karten und so
      this.all.push({
        user_name: player_json.username,
        small_blind: player_json.is_small_blind,
        big_blind: player_json.is_big_blind
      });
    };

    this.set_all_players = function(all_players){
      this.all = [];
      for (var i = 0; i < all_players.length; i++) {
        this.add_player(all_players[i]);
      }
    };

    /**
     * returns the index of the player with the given name.
     * is -1 if not found
     * @param {String} player_name the name of the player to search for
     * @returns {number} the index of the player (-1 if not found)
     */
    this.get_index_of_player = function (player_name) {
      for (var i = 0; i < this.all.length; i++) {
        if (this.all[i].user_name == player_name) {
          return i;
        }
      }
      return -1;
    };
  });
