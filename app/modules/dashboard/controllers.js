'use strict';

angular.module('Dashboard')

.controller('DashboardController',
  ['$scope', '$window', '$state', 'AuthenticationService', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, AuthenticationService, DashboardService, $stateParams) {
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

    const globals = JSON.parse($window.localStorage.getItem('globals')) || {}
    if (globals.currentUser) {
      $scope.name = globals.currentUser.name;
      $scope.surname = globals.currentUser.surname;
      $scope.email = globals.currentUser.email;
    }
  }])

.controller('UserEditController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {

    if ($stateParams.id) {
      DashboardService.GetUser($stateParams.id, function(response) {
        if (response.response) {
          const { user } = response.response.result;
          if (user) {
            $scope.detailUser = user;
            $scope.detailUser.password = '';
          }
        }
      });
    }

    $scope.updateUser = function () {
      $scope.dataLoading = true;
      DashboardService.UpdateUser(
        $scope.detailUser.id, $scope.detailUser.name, $scope.detailUser.surname, $scope.detailUser.address, $scope.detailUser.zipcode,
        $scope.detailUser.city, $scope.detailUser.phone, $scope.detailUser.email, function(response) {
        if(!response.error) {
            $state.go('dashboard.users');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

  .controller('UserDeleteController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {
    console.log($stateParams.id)
    if ($stateParams.id) {
      DashboardService.DeleteUser($stateParams.id, function(response) {
        if (response.response) {
          $state.go('dashboard.users');
        }
        else {
          $scope.error = response.error.message;
          $scope.dataLoading = false;
        }
      });
    }

  }]);
