'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('mainApp', [
    'Authentication',
    'Home',
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
          controller: 'HomeController',
          templateUrl: 'modules/home/views/home.html'
        })

        .state('dashboard.users', {
          url: '/dashboard1',
          controller: 'HomeController',
          templateUrl: 'modules/home/views/users.html'
        })

        .state('dashboard.dashboard1', {
          url: '/dashboard1',
          controller: 'HomeController',
          templateUrl: 'modules/home/views/dashboard1.html'
        })

        .state('dashboard.dashboard2', {
          url: '/dashboard2',
          controller: 'HomeController',
          templateUrl: 'modules/home/views/dashboard2.html'
        })

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
