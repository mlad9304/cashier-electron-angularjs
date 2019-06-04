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

      // reset login status
      AuthenticationService.ClearCredentials();

      $scope.login = function () {
          $scope.dataLoading = true;
          AuthenticationService.Login($scope.email, $scope.password, function(response) {
              if(response.success) {
                  AuthenticationService.SetCredentials($scope.email, $scope.password);
                  $location.path('/');
              } else {
                  $scope.error = response.message;
                  $scope.dataLoading = false;
              }
          });
      };
    }]);
