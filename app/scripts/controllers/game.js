'use strict';

/**
 * @author Stefan Fuchs
 * @author Jan-Niklas Wortmann
 * @ngdoc function
 * @name pokerFrontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('GameCtrl', function ($scope, $location, socket, user, playersInGame) {

    /**
     * all players who are in the current game (is a service)
     * @type {playersInGame|*}
     */
    //dies ist ein tst
    $scope.playersInGame = playersInGame;
    /**
     * the cards laying on the board (max. 5)
     * @type {Array}
     */
    $scope.board_cards = [];
    /**
     * the handcards of the player (2)
     * @type {Array}
     */
    $scope.hand_cards = [];

    /**
     * the money of the player
     * @type {number}
     */
    $scope.user_money = 0;
    /**
     * the money collected from all users
     * @type {number}
     */
    $scope.pod = 0;
    /**
     * boolean representing if it is the current players turn
     * @type {boolean}
     */
    $scope.is_your_turn = false;
    /**
     * an array of all users to display their names and cards
     * @type {Array}
     */
    $scope.all_user = [];
    /**
     * the actions available for the user to disable action buttons
     * @type {{bet: boolean, call: boolean, raise: boolean, fold: boolean, check: boolean}}
     */
    $scope.available_actions = {
      bet: false,
      call: false,
      raise: false,
      fold: false,
      check: false
    };
    /**
     * the amount the player needs to pay if he calls
     * @type {number}
     */
    $scope.call_value = 0;
    /**
     * a boolean representing the current state of the game
     * @type {boolean}
     */
    $scope.is_running = false;
    /**
     * instance of the new game modal
     */
    $scope.new_game_alert;

    /**
     * CONSTANT of the width of the cards in the game
     * @type {number}
     */
    var CARD_WIDTH = 64;
    /**
     * CONSTANT of the left position of the first board card.
     * The next four aligning with the card width and 10 px padding.
     * @type {number}
     */
    var BOARD_LEFT = 530;
    /**
     * CONSTANT of the left position of the first hand card.
     * The next card aligning with the card width and 10 px padding.
     * @type {number}
     */
    var HAND_LEFT = 580;
    /**
     * CONSTANT of the top position of the hand cards.
     * @type {number}
     */
    /**
     * @ngdoc property
     * @name HAND_TOP
     * @propertyOf pokerFrontendApp.controller:GameCtrl
     * @description
     * CONSTANT of the top position of the hand cards.
     */
    var HAND_TOP = 350;

    /**
     * @ngdoc method
     * @name start_round
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * Sends a request to the server to start the round.
     * Only possible if there are two or more players and no game running.
     */
    function start_round() {
      socket.send(socket.create_json_string({room_id: user.room_id}, "start_round"));
    }

    /**
     * @ngdoc method
     * @name to_main_route
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * Changing the location to the main route. Can be used by buttons.
     */
    $scope.to_main_route = function () {
      $location.path("/main");
    };

    /**
     * @ngdoc method
     * @name flip_hand_cards
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * flips a card in the hand cards array.
     * @param {int} card_id the index of the hand card
     */
    $scope.flip_hand_cards = function (card_id) {
      $scope.hand_cards[card_id].flipped = !$scope.hand_cards[card_id].flipped;
    };

    /**
     * @ngdoc method
     * @name flip_board_cards
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * sets flipped of card with given card_id = true
     * @param {int} card_id id of the flipping card
     */
    $scope.flip_board_cards = function (card_id) {
      $scope.board_cards[card_id].flipped = true;//!$scope.board_cards[card_id].flipped;
    };

    /**
     * @ngdoc method
     * @name move_boardcards
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * recursively moving the boardcards to their needed position.
     * @param {int} card_id the index of the first card fixed to 'card_' + index
     */
    function move_boardcards(card_id) {
      if (card_id == 5) {
        //all possible cards animated
        return;
      }

      $("#card_" + card_id + " > div").animate({
        left: (BOARD_LEFT - ((CARD_WIDTH + 10) * card_id))
      }, 200, "easeOutQuad", function () {
        $scope.$apply(function () {
          $scope.flip_board_cards(card_id)
        });
        move_boardcards(card_id + 1);
      });
    }

    /**
     * @ngdoc method
     * @name move_two_handcards
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * recursively moving the handcards to their needed position.
     * @param {int} card_id the index of the first card fixed to 'hand_card_' + index
     */
    function move_two_handcards(card_id) {
      if (card_id == 2) {
        //all start cards dealt
        return;
      }

      $("#hand_card_" + card_id + " > div").animate({
        left: (HAND_LEFT - ((CARD_WIDTH + 10) * card_id)),
        top: HAND_TOP
      }, 200, "easeOutQuad", function () {
        $scope.$apply(function () {
          $scope.flip_hand_cards(card_id)
        });
        move_two_handcards(card_id + 1);
      });
    }

    /**
     * @ngdoc method
     * @name add_hand_cards
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * adds an array of cards to the hand_cards array.
     * normally just two cards.
     * @param {Array} cards the array of hand_cards to be added
     */
    $scope.add_hand_cards = function (cards) {
      for (var i = 0; i < cards.length; i++) {
        $scope.hand_cards.push({
          flipped: false,
          color: cards[i].symbol,
          value: cards[i].value
        });
      }
      //setTimeout for ng-repeat to run
      setTimeout(function () {
        move_two_handcards(0);
      }, 100);
    };

    /**
     * @ngdoc method
     * @name add_board_cards
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * adds board cards to the bard_card array.
     * if a card in the cards array is already in board_cards, it is not added.
     * @param {Array} cards the board cards to be added
     */
    $scope.add_board_cards = function (cards) {
      for (var i = 0; i < cards.length; i++) {
        if ($scope.board_cards[i] == undefined || ($scope.board_cards[i].value != cards[i].value && $scope.board_cards[i].color != cards[i].symbol)) {
          $scope.board_cards.push({
            flipped: false,
            color: cards[i].symbol,
            value: cards[i].value
          });
        }
      }
      //setTimeout for ng-repeat to run
      setTimeout(function () {
        move_boardcards(0);
      }, 100);
    };

    /**
     * @ngdoc method
     * @name do_bet
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * displays a prompt asking for the value to bet.
     * after typing in, sends a request to the server, asking for do_bet method with given amount.
     */
    $scope.do_bet = function () {
      alertify.prompt('Wie viel möchtest du setzen?', 'Betrag',
        function (evt, value) {
          socket.send(socket.create_json_string({bet: value}, 'do_bet'));
        }
      ).set('type', 'number').set('movable', false).setHeader('Setzen');
    };

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * # do_bet_response
     * response handler of the do_bet method.
     * if successful response, nothing happens, if error response, the message is displayed via notification.
     */
    $scope.$on("do_bet_response", function (event, data) {
      if (!socket.is_succesfull_response(data)) {
        alertify.error(data.message);
      }
    });

    /**
     * @ngdoc method
     * @name do_fold
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * display a confirm dialog to be sure that the user wants to fold.
     * if he clicks ok a fold request is send to the server.
     */
    $scope.do_fold = function () {
      alertify.confirm('Wirklich aussteigen?', function () {
        socket.send(socket.create_json_string({}, 'do_fold'));
      }).set('movable', false).setHeader('Aussteigen');
    };

    /**
     * @ngdoc method
     * @name do_call
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * sends the do_call request to the server. No handlers needed for this.
     */
    $scope.do_call = function () {
      socket.send(socket.create_json_string({}, 'do_call'));
    };

    /**
     * @ngdoc method
     * @name do_raise
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * displays a prompt for the user to input the amount he wants to raise.
     * if he enters a valid amount, the do_raise request is send to the server.
     * a response handler is implemented.
     */
    $scope.do_raise = function () {
      alertify.prompt('Um wie viel möchtest du den zu setzenden Betrag erhöhen?', 'Betrag',
        function (evt, value) {
          socket.send(socket.create_json_string({raise: value}, 'do_raise'));
        }
      ).set('type', 'number').set('movable', false).setHeader('Erhöhen');
    };

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * # do_raise_response
     * the response handler of the do_raise request.
     * if error response, the message is displayed via notification.
     * if success response, nothing happens.
     */
    $scope.$on("do_raise_response", function (event, data) {
      if (!socket.is_succesfull_response(data)) {
        alertify.error(data.message);
      }
    });

    /**
     * @ngdoc method
     * @name do_check
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * sends the do_check request to the server.
     */
    $scope.do_check = function () {
      socket.send(socket.create_json_string({}, 'do_check'));
    };

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * # action_notification
     * the handler for the action_notification push of the server.
     * is send if any player does an action. it refreshes the
     * - list of all players
     * - the user money
     * - the pod value
     * - the is_your_turn boolean
     * - the available methods of the user
     * - the is_running boolean (game)
     * - the call_value (int)
     * if it is the players turn, a notification is displayed.
     */
    $scope.$on("action_notification", function (event, data) {
      var body = data.body;
      var all_players = body.all_users;
      $scope.$apply(function () {
        $scope.user_money = body.your_money;
        $scope.pod = body.pod;
        $scope.is_your_turn = body.your_turn;
        $scope.available_actions = body.available_methods;
        $scope.is_running = body.is_running;
        $scope.call_value = body.call_value;
        set_all_players(all_players);
        if ($scope.is_your_turn) {
          alertify.message("Du bist am Zug");
        }
      });
    });

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * # round_starts_notification
     * the notification from the server when a new round starts.
     * sets all needed variables like:
     * - board_cards
     * - hand_cards
     * - the user_money
     * - the pod value
     * - is_your_turn boolean
     * - the available_actions of the user
     * - the call_value (int)
     * - is_running boolean (game)
     * sets the hand_cards of the user.
     */
    $scope.$on("round_starts_notification", function (event, data) {
      var body = data.body;
      var all_players = body.all_users;
      $scope.$apply(function () {
        $scope.board_cards = [];
        $scope.hand_cards = [];
        $scope.user_money = body.your_money;
        $scope.pod = body.pod;
        $scope.is_your_turn = body.your_turn;
        $scope.available_actions = body.available_methods;
        $scope.call_value = body.call_value;
        $scope.is_running = body.is_running;
        set_all_players(all_players);
        $scope.add_hand_cards(body.cards);
      });
    });

    /**
     * @ngdoc method
     * @name set_all_players
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * helper function to set/refresh all players in the game.
     * calls {@link pokerFrontendApp.playersInGame#methods_set_all_players set_all_players()} of the {@link pokerFrontendApp.playersInGame playerInGame} service.
     * @param {Array} all_players the array of player to be added
     */
    function set_all_players(all_players) {
      playersInGame.set_all_players(all_players);
    }

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * # user_list_notification
     * notification send from server, that a user joined/left the game.
     * contains an array of ALL players.
     * calls set_all_players()
     */
    $scope.$on("user_list_notification", function (event, data) {
      var all_users = data.body.all_users;
      $scope.$apply(function () {
        set_all_players(all_users);
      });
    });

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * # request_start_round_response
     * response handler of request_start_round.
     * displays the message of the response via notification.
     */
    $scope.$on("request_start_round_response", function (event, data) {
      alertify.message(data.body.message);
    });

    /**
     * @ngdoc method
     * @name $on
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
     * notification send from server giving new board_cards.
     * contains a growing array, e.g. first time [3] cards, second time [4] cards, third time [5] cards.
     * calls add_board_cards(cards) to add the new cards to view.
     */
    $scope.$on("board_cards_notification", function (event, data) {
      var body = data.body;
      $scope.$apply(function () {
        $scope.add_board_cards(body.cards);
      });
    });

     /**
     * @ngdoc method
     * @name $watch
     * @methodOf pokerFrontendApp.controller:GameCtrl
     * @description
      * # is_running
      * registers a watch handler for the is_running boolean.
      * if it changes to true, all start_new_game dialogs are closed,
      * if it changes to false, a new one is opened.
     */
    $scope.$watch('is_running', function (newValue, oldValue) {
      if (newValue == true) {
        //alertify.closeAll();
        $scope.new_game_alert.close();
      } else {
        $scope.new_game_alert = alertify.alert('Neue Runde starten', 'Eine Runde kann gestartet werden, wenn sich mindestens zwei Spieler im Raum befinden und noch kein Spiel läuft.').
          set('modal', false).
          set('movable', false).
          set('closable', false).
          set('pinnable', false).
          set('label', 'Start anfragen').
          set('onok', function (closeEvent) {
            closeEvent.cancel = true;
            start_round();
          }).
          set('autoReset', false).
          moveTo(0, 250);
      }
    });
  });
