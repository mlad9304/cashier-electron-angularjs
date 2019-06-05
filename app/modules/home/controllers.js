'use strict';

angular.module('Home')

.controller('HomeController',
  ['$scope', '$window', '$location', 'AuthenticationService',
  function ($scope, $window, $location, AuthenticationService) {
    $('#example1').DataTable();
    $('.sidebar-menu').tree();

    $scope.logout = function () {
      AuthenticationService.ClearCredentials();
      $location.path('/login');
    }
  }]);
