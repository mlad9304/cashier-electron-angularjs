'use strict';

angular.module('Home')

.controller('HomeController',
  ['$scope',
  function ($scope) {
    $('#example1').DataTable();
    $('.sidebar-menu').tree();
  }]);
