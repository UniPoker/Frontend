'use strict';

/**
 * @ngdoc function
 * @name pokerFrontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the pokerFrontendApp
 */
angular.module('pokerFrontendApp')
  .controller('GameCtrl', function ($scope, $location) {

    //maximal 7, 5 aufm board, 2 handkarten
    $scope.cards = [];
    $scope.colors = ['spades', 'diamonds', 'hearts', 'clubs'];
    //positioning of card images in px
    var CARD_WIDTH = 64;
    var BOARD_LEFT = 550;
    var HAND_LEFT = 650;
    var HAND_TOP = 400;


    //test section
    $scope.test_flipped = false;
    $scope.collapsed = false;

    $scope.to_main_route = function(){
      $location.path("/main");
    };

    $scope.flip_it = function (card_id) {
      $scope.cards[card_id].flipped = !$scope.cards[card_id].flipped;
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
      if (card_id == 5) {
        //all start cards dealt
        return;
      }

      $("#card_" + card_id + " > div").animate({
        left: (HAND_LEFT - ((CARD_WIDTH + 10) * card_id)),
        top: HAND_TOP
      }, 200, "easeOutQuad", function () {
        $scope.$apply(function () {
          $scope.flip_it(card_id)
        });
        move_two_handcards(card_id + 1);
      });
    }

    function move_last_board_cards(card_id){
      $("#card_" + card_id + " > div").animate({
        left: (BOARD_LEFT - ((CARD_WIDTH + 10) * (card_id - 2))) //-2 weil schon zwei handkarten liegen
      }, 200, "easeOutQuad", function () {
        $scope.$apply(function () {
          $scope.flip_it(card_id)
        });
      });
    }

    $scope.add = function () {
      //hier kommt array vom server, for schleife durchlaufen und pushen, dann unten das aufrufen
      $scope.cards.push({
        value: Math.floor((Math.random() * 10) + 1),
        color: $scope.colors[Math.floor((Math.random() * 3))],
        flipped: false
      });
      var length = $scope.cards.length;
      if(length == 5){
        setTimeout(function(){ //muss timeout hin, damit das ng-repeat durch ist
          move_first_three_board_card(0);
        }, 100);
      }else if(length > 5 && length < 8){
        setTimeout(function() {
          move_last_board_cards($scope.cards.length - 1);
        }, 100);
      }
    };
  });
