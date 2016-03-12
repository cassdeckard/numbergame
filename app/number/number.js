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
  this.reroll = function() {
    $scope.targetNumber = randomInt();
  }

  this.triggerWin = function() {
    this.onWin();
  }

  this.onWin = function() {
    $timeout(function() { $window.alert('GOOD JOB!'); });
    this.reroll();
  }

  function randomInt() {
    return Math.floor((Math.random()*6)+1);
  }
}]);
