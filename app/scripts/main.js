'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Dashboard', []);

angular.module('mainApp', [
    'Authentication',
    'Dashboard',
    // 'ngRoute',
    'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
          url: '/login',
          controller: 'AuthController',
          templateUrl: 'modules/authentication/views/login.html'
        })

        .state('register', {
          url: '/register',
          controller: 'AuthController',
          templateUrl: 'modules/authentication/views/register.html'
        })

        .state('dashboard', {
          url: '/dashboard',
          controller: 'DashboardController',
          templateUrl: 'modules/dashboard/views/index.html'
        })

        .state('dashboard.groups', {
          url: '/groups',
          controller: 'GroupsController',
          templateUrl: 'modules/dashboard/views/groups.html'
        })

        .state('dashboard.add_group', {
          url: '/add_group',
          controller: 'AddGroupController',
          templateUrl: 'modules/dashboard/views/add_group.html'
        })

        .state('dashboard.group_edit', {
          url: '/group_edit/{id}',
          controller: 'GroupEditController',
          templateUrl: 'modules/dashboard/views/group_edit.html'
        })

        .state('dashboard.group_delete', {
          url: '/group_delete/{id}',
          controller: 'GroupDeleteController'
        })

        .state('dashboard.users', {
          url: '/users',
          controller: 'DashboardController',
          templateUrl: 'modules/dashboard/views/users.html'
        })

        .state('dashboard.add_user', {
          url: '/add_user',
          controller: 'AddUserController',
          templateUrl: 'modules/dashboard/views/add_user.html'
        })

        .state('dashboard.user_edit', {
          url: '/user_edit/{id}',
          controller: 'UserEditController',
          templateUrl: 'modules/dashboard/views/user_edit.html'
        })

        .state('dashboard.user_delete', {
          url: '/user_delete/{id}',
          controller: 'UserDeleteController'
        })

        .state('dashboard.customers', {
          url: '/customers',
          controller: 'CustomersController',
          templateUrl: 'modules/dashboard/views/customers.html'
        })

        .state('dashboard.add_customer', {
          url: '/add_customer',
          controller: 'AddCustomerController',
          templateUrl: 'modules/dashboard/views/add_customer.html'
        })

        .state('dashboard.customer_edit', {
          url: '/customer_edit/{id}',
          controller: 'CustomerEditController',
          templateUrl: 'modules/dashboard/views/customer_edit.html'
        })

        .state('dashboard.customer_delete', {
          url: '/customer_delete/{id}',
          controller: 'CustomerDeleteController'
        });

    $urlRouterProvider.otherwise('/login');
}])

.run(['$rootScope', '$location', '$window', '$http',
    function ($rootScope, $location, $window, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = JSON.parse($window.localStorage.getItem('globals')) || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && $location.path() !== '/register' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
