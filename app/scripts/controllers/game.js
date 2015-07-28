'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('GameCtrl', function ($scope, $location, socket, user) {

    //maximal 7, 5 aufm board, 2 handkarten
    $scope.board_cards = [];
    $scope.hand_cards = [];

    $scope.user_money = 0;
    $scope.pod = 0;
    $scope.is_your_turn = false;
    $scope.all_user = [];

    //positioning of card images in px
    var CARD_WIDTH = 64;
    var BOARD_LEFT = 550;
    var HAND_LEFT = 600;
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

    function move_first_three_board_card(card_id) {
      if (card_id == 3) {
        //if three cards are animated, stop
        move_two_handcards(card_id);
        return;
      }

      $("#card_" + card_id + " > div").animate({
        left: (BOARD_LEFT - ((CARD_WIDTH + 10) * card_id))
      }, 200, "easeOutQuad", function () {
        $scope.$apply(function () {
          $scope.flip_it(card_id)
        });
        move_first_three_board_card(card_id + 1);
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

    function move_last_board_cards(card_id) {
      $("#card_" + card_id + " > div").animate({
        left: (BOARD_LEFT - ((CARD_WIDTH + 10) * (card_id - 2))) //-2 weil schon zwei handkarten liegen
      }, 200, "easeOutQuad", function () {
        $scope.$apply(function () {
          $scope.flip_it(card_id)
        });
      });
    }

    //$scope.add = function () {
      ////hier kommt array vom server, for schleife durchlaufen und pushen, dann unten das aufrufen
      //$scope.cards.push({
      //  value: Math.floor((Math.random() * 10) + 1),
      //  color: $scope.colors[Math.floor((Math.random() * 3))],
      //  flipped: false
      //});
      //var length = $scope.cards.length;
      //if (length == 5) {
      //  setTimeout(function () { //muss timeout hin, damit das ng-repeat durch ist
      //    move_first_three_board_card(0);
      //  }, 100);
      //} else if (length > 5 && length < 8) {
      //  setTimeout(function () {
      //    move_last_board_cards($scope.cards.length - 1);
      //  }, 100);
      //}
    //};

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

    $scope.$on("round_starts_notification", function (event, data) {
      var body = data.body;
      $scope.$apply(function () {
        $scope.user_money = body.your_money;
        $scope.pod = body.pod;
        $scope.is_your_turn = body.your_turn;
        $scope.all_user = body.all_users;
        $scope.add_hand_cards(body.cards);
      });
    });
  });
