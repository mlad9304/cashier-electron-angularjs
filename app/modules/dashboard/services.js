'use strict';

angular.module('Dashboard')

.factory('DashboardService',
    ['$http', '$rootScope', '$window',
    function ($http, $rootScope, $window) {
        var service = {};

        service.GetAllUsers = function (callback) {

            const payload = {
              name: 'getAllUsers',
              param: {  }
             };
            $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
                .then(function (response) {
                  callback(response.data);
                }, function (error) {
                  console.log(error);
                });

        };

        service.GetUser = function (id, callback) {

          const payload = {
            name: 'getUser',
            param: { id }
           };
          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });

        };

        service.UpdateUser = function (id, name, surname, address, zipcode, city, phone, email, callback) {
          const payload = {
            name: 'updateUser',
            param: { id, name, surname, address, zipcode, city, phone, email }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        return service;
    }]);
