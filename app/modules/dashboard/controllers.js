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

.controller('AddUserController',
  ['$scope', '$window', '$state', 'DashboardService',
  function ($scope, $window, $state, DashboardService) {
    $scope.newUser = {};

    $scope.addUser = function () {
      $scope.dataLoading = true;
      DashboardService.AddUser(
        $scope.newUser.name, $scope.newUser.surname, $scope.newUser.address, $scope.newUser.zipcode,
        $scope.newUser.city, $scope.newUser.phone, $scope.newUser.email, $scope.newUser.password, function(response) {
        if(!response.error) {
            $state.go('dashboard.users');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('CustomersController',
  ['$scope', '$window', '$state', 'DashboardService',
  function ($scope, $window, $state, DashboardService) {
    $scope.customers = [];

    DashboardService.GetAllCustomers(function(response) {
      if (response.response) {
        const { customers } = response.response.result;
        if (customers) {
          $scope.customers = customers;
        }
      }
    });

  }])

.controller('AddCustomerController',
  ['$scope', '$window', '$state', 'DashboardService',
  function ($scope, $window, $state, DashboardService) {
    $scope.newCustomer = {};

    $scope.addCustomer = function () {
      $scope.dataLoading = true;
      DashboardService.AddCustomer(
        $scope.newCustomer.name, $scope.newCustomer.surname, $scope.newCustomer.func, $scope.newCustomer.social_reason, $scope.newCustomer.billing_address,
        $scope.newCustomer.delivery_address, $scope.newCustomer.zipcode, $scope.newCustomer.city, $scope.newCustomer.country, $scope.newCustomer.email,
        $scope.newCustomer.mobile_phone, $scope.newCustomer.fixed_phone, $scope.newCustomer.status, $scope.newCustomer.comment, $scope.newCustomer.created_date, function(response) {
        if(!response.error) {
            $state.go('dashboard.customers');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('CustomerEditController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {

    if ($stateParams.id) {
      DashboardService.GetCustomer($stateParams.id, function(response) {
        if (response.response) {
          const { customer } = response.response.result;
          if (customer) {
            $scope.detailCustomer = customer;
          }
        }
      });
    }

    $scope.updateCustomer = function () {
      $scope.dataLoading = true;
      DashboardService.UpdateCustomer(
        $scope.detailCustomer.id, $scope.detailCustomer.name, $scope.detailCustomer.surname, $scope.detailCustomer.func, $scope.detailCustomer.social_reason, $scope.detailCustomer.billing_address,
        $scope.detailCustomer.delivery_address, $scope.detailCustomer.zipcode, $scope.detailCustomer.city, $scope.detailCustomer.country, $scope.detailCustomer.email,
        $scope.detailCustomer.mobile_phone, $scope.detailCustomer.fixed_phone, $scope.detailCustomer.status, $scope.detailCustomer.comment, $scope.detailCustomer.created_date, function(response) {
        if(!response.error) {
            $state.go('dashboard.customers');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }]);
