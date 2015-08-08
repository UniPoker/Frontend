'use strict';

/**
 * @ngdoc service
 * @name pokerFrontendApp.playersInGame
 * @description
 * # playersInGame
 * Service in the pokerFrontendApp.
 */
angular.module('pokerFrontendApp')
  .service('playersInGame', function (user) {
    this.all = [];

    this.add_player = function (player_json) {
      this.all.push({
        user_name: player_json.username,
        small_blind: player_json.is_small_blind,
        big_blind: player_json.is_big_blind,
        is_active: player_json.is_active,
        hand_cards: getHandCards(player_json)
        //player_json.hand_cards
      });
    };

    function getHandCards(player_json){
      console.log("PLAYJSON ", player_json, player_json.username, user.name);
      if(user.name != player_json.username){
        return [{
          flipped: player_json.show_cards,
          color: player_json.hand_cards[0].symbol,
          value: player_json.hand_cards[0].value
        },
          {
            flipped: player_json.show_cards,
            color: player_json.hand_cards[1].symbol,
            value: player_json.hand_cards[1].value
          }]
      }
      return [];
    }

    /**
     * @ngdoc method
     * @name set_all_players
     * @methodOf pokerFrontendApp.playersInGame
     * @description
     * helper function to set/refresh all players in the game.
     * calls set_all_players() of the playersInGame service.
     * @param {Array} all_players the array of player to be added
     */
    this.set_all_players = function (all_players) {
      this.all = [];
      for (var i = 0; i < all_players.length; i++) {
        this.add_player(all_players[i]);
      }
    };

    /**
     * @ngdoc method
     * @name get_index_of_player
     * @methodOf pokerFrontendApp.playersInGame
     * @description
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
