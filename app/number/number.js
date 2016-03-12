'use strict';

angular.module('myApp.number', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/number', {
    templateUrl: 'number/number.html',
    controller: 'NumberCtrl',
    controllerAs: 'ctrl'
  });
}])

.controller('NumberCtrl', ['$scope', '$window', '$timeout', 'ngAudio', function($scope, $window, $timeout, ngAudio) {
  $scope.numArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  this.reroll = function() {
    shuffle($scope.numArray);
    $scope.targetNumber = $scope.numArray[randomInt(0, 4)];
    $scope.targetAudioFilename = 'media/' + $scope.targetNumber + '.m4a';
    $scope.targetAudio = ngAudio.load($scope.targetAudioFilename);
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
