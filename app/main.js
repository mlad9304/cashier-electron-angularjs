var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'pages/auth/login.html',
			controller: 'authController'
    })
    .when('/register', {
			templateUrl: 'pages/auth/register.html',
			controller: 'authController'
		})
		.when('/dashboard', {
			templateUrl: 'pages/dashboard/index.html',
			controller: 'dashboardController'
		})
		.otherwise({
			redirectTo: '/login'
		});
});

mainApp.controller('authController', function($scope) {
  $('input[type="checkbox"]').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue',
    increaseArea: '20%' /* optional */
  });

});

mainApp.controller('dashboardController', function($scope) {
  $('#example1').DataTable()
});
