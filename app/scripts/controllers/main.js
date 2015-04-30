'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    var todosInStore = localStorageService.get('todos');

        var amount = localStorageService.length();
    console.log(amount);
    console.log(todosInStore);
    
    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function() {
        localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function() {
    	$scope.todos.push($scope.todo);
    	$scope.todo = '';
    };

    $scope.removeTodo = function(index) {
    	$scope.todos.splice(index, 1);
    };
    
  });

