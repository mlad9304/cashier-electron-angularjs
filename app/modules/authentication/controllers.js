'use strict';

angular.module('Authentication')

.controller('AuthController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

      $('input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });

      $scope.gotoRegister = function () {
        $location.path('/register');
      }

      $scope.gotoLogin = function () {
        $location.path('/login');
      }

      $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.email, $scope.password, function(response) {
          if(response.response) {
              const { token, name, surname, email } = response.response.result;
              AuthenticationService.SetCredentials(token, name, surname, email);
              $location.path('/');
          } else {
              $scope.error = response.error.message;
              $scope.dataLoading = false;
          }
        });
      };

      $scope.register = function () {
        $scope.dataLoading = true;
        AuthenticationService.Register(
          $scope.name, $scope.surname, $scope.address, $scope.zipcode,
          $scope.city, $scope.phone, $scope.email, $scope.password, function(response) {
          if(!response.error) {
              $location.path('/login');
          } else {
              $scope.error = response.error.message;
              $scope.dataLoading = false;
          }
        });
      };
    }]);
