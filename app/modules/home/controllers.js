'use strict';

angular.module('Home')

.controller('HomeController',
  ['$scope', '$window', 'AuthenticationService', '$state',
  function ($scope, $window, AuthenticationService, $state) {
    $('#example1').DataTable();
    $('.sidebar-menu').tree();

    $scope.logout = function () {
      AuthenticationService.ClearCredentials();
      $state.go('login');
    }
  }]);
