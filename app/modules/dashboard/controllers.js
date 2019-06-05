'use strict';

angular.module('Dashboard')

.controller('DashboardController',
  ['$scope', '$window', '$state', 'AuthenticationService', 'DashboardService',
  function ($scope, $window, $state, AuthenticationService, DashboardService) {
    // $('#users-table').DataTable();
    $('.sidebar-menu').tree();

    $scope.users = [];

    DashboardService.GetAllUsers(function(response) {
      if (response.response) {
        const { users } = response.response.result;
        if (users) {
          $scope.users = users;
        }
      }
    });

    $scope.logout = function () {
      AuthenticationService.ClearCredentials();
      $state.go('login');
    }
  }]);
