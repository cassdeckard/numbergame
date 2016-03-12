'use strict';

angular.module('myApp.number', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/number', {
    templateUrl: 'number/number.html',
    controller: 'NumberCtrl',
    controllerAs: 'ctrl'
  });
}])

.controller('NumberCtrl', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
  $scope.numArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  this.reroll = function() {
    shuffle($scope.numArray);
      $scope.targetNumber = $scope.numArray[0];
  }

  this.triggerWin = function() {
    this.onWin();
  }

  this.onWin = function() {
    $timeout(function() { $window.alert('GOOD JOB!'); });
    this.reroll();
  }

  this.select = function(num) {
    if (num === $scope.targetNumber) {
      this.triggerWin();
    }
  }

  function randomInt() {
    return Math.floor((Math.random()*6)+1);
  }

  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}]);
