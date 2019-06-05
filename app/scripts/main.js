'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('mainApp', [
    'Authentication',
    'Home',
    'ngRoute'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
          controller: 'AuthController',
          templateUrl: 'modules/authentication/views/login.html',
          hideMenus: true
        })

        .when('/register', {
          controller: 'AuthController',
          templateUrl: 'modules/authentication/views/register.html',
          hideMenus: true
        })

        .when('/', {
          controller: 'HomeController',
          templateUrl: 'modules/home/views/home.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$window', '$http',
    function ($rootScope, $location, $window, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = JSON.parse($window.localStorage.getItem('globals')) || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && $location.path() !== '/register' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
