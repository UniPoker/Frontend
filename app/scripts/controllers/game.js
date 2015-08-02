'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('GameCtrl', function ($scope, $location, socket, user, playersInGame) {

    $scope.playersInGame = playersInGame;
    //maximal 7, 5 aufm board, 2 handkarten
    $scope.board_cards = [];
    $scope.hand_cards = [];

    $scope.user_money = 0;
    $scope.pod = 0;
    $scope.is_your_turn = false;
    $scope.all_user = [];
    $scope.available_actions = {
      bet: false,
      call: false,
      raise: false,
      fold: false,
      check: false
    };

    //positioning of card images in px
    var CARD_WIDTH = 64;
    var BOARD_LEFT = 530;
    var HAND_LEFT = 580;
    var HAND_TOP = 350;

    //test section
    $scope.test_flipped = false;
    $scope.collapsed = false;

    var init = function () {
      socket.send(socket.create_json_string({room_id: user.room_id}, "start_round"));
    }();

    $scope.to_main_route = function () {
      $location.path("/main");
    };

    $scope.flip_hand_cards = function (card_id) {
      $scope.hand_cards[card_id].flipped = !$scope.hand_cards[card_id].flipped;
    };

    /**
     * sets flipped of card with given card_id = true
     * @param card_id id of the flipping card
     */
    $scope.flip_board_cards = function (card_id) {
      $scope.board_cards[card_id].flipped = true;//!$scope.board_cards[card_id].flipped;
    };

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

    //function move_last_board_cards(card_id) {
    //  $("#card_" + card_id + " > div").animate({
    //    left: (BOARD_LEFT - ((CARD_WIDTH + 10) * (card_id - 2))) //-2 weil schon zwei handkarten liegen
    //  }, 200, "easeOutQuad", function () {
    //    $scope.$apply(function () {
    //      $scope.flip_it(card_id)
    //    });
    //  });
    //}

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

    $scope.add_board_cards = function (cards) {
      for (var i = 0; i < cards.length; i++) {
        if($scope.board_cards[i] == undefined || ($scope.board_cards[i].value != cards[i].value && $scope.board_cards[i].color != cards[i].symbol)){
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

    $scope.do_bet = function () {
      socket.send(socket.create_json_string({bet: 15}, 'do_bet'));
    };

    $scope.do_fold = function () {
      socket.send(socket.create_json_string({}, 'do_fold'));
    };

    $scope.do_call = function () {
      socket.send(socket.create_json_string({}, 'do_call'));
    };

    $scope.do_raise = function () {
      socket.send(socket.create_json_string({raise: 15}, 'do_raise'));
    };

    $scope.do_check = function () {
      socket.send(socket.create_json_string({}, 'do_check'));
    };

    $scope.$on("action_notification", function (event, data) {
      var body = data.body;
      var all_players = body.all_users;
      $scope.$apply(function () {
        $scope.user_money = body.your_money;
        $scope.pod = body.pod;
        $scope.is_your_turn = body.your_turn;
        $scope.available_actions = body.available_methods;
        set_all_players(all_players);
      });
    });

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
        set_all_players(all_players);
        $scope.add_hand_cards(body.cards);
      });
    });

    function set_all_players(all_players) {
      playersInGame.set_all_players(all_players);
    }

    $scope.$on("user_joined_notification", function (event, data) {
      var all_users = data.body.all_users;
      console.log("JOINED: ", all_users);
      $scope.$apply(function () {
        set_all_players(all_users);
      });
    });

    $scope.$on("user_left_notification", function (event, data) {
      var all_users = data.body.all_users;
      console.log("LEFT: ", all_users);
      $scope.$apply(function () {
        set_all_players(all_users);
      });
    });

    $scope.$on("board_cards_notification", function (event, data) {
      var body = data.body;
      $scope.$apply(function(){
        $scope.add_board_cards(body.cards);
      });
    });
  });
