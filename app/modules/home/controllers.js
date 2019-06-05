'use strict';

angular.module('Home')

.controller('HomeController',
  ['$scope', '$window', '$location',
  function ($scope, $window, $location) {
    $('#example1').DataTable();
    $('.sidebar-menu').tree();

    $scope.logout = function () {
      $window.localStorage.removeItem('globals');
      $location.path('/login');
    }
  }]);
