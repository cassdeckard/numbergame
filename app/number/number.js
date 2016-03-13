'use strict';

angular.module('myApp.number', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/number', {
    templateUrl: 'number/number.html',
    controller: 'NumberCtrl',
    controllerAs: 'ctrl'
  });
}])

.controller('NumberCtrl', ['$scope', '$timeout', 'ngAudio', function($scope, $timeout, ngAudio) {
  $scope.numObjects = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function(num) {
    var filename = 'media/' + num + '.m4a';
    var audio = ngAudio.load(filename);
    return {
      val: num,
      audio: audio
    }
  });

  this.reroll = function() {
    shuffle($scope.numObjects);
    var targetIdx = randomInt(0, 4);
    $scope.targetNumber = $scope.numObjects[targetIdx];
    $scope.winAudio = ngAudio.load('media/yay.wav');
    $scope.winAudio.volume = 0.25;
    $scope.loseAudio = ngAudio.load('media/no.m4a');
    $scope.targetNumber.audio.play();
  }

  this.triggerWin = function() {
    this.onWin();
  }

  this.onWin = function() {
    $scope.winAudio.play();
    $timeout(this.reroll, $scope.winAudio.remaining * 1000);
  }

  this.select = function(num) {
    if (num === $scope.targetNumber.val) {
      this.triggerWin();
    }
    else {
      $scope.loseAudio.play();
    }
  }

  function randomInt(min, range) {
    return Math.floor((Math.random() * range) + min);
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
