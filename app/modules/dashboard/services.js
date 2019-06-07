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

        service.DeleteUser = function (id, callback) {
          const payload = {
            name: 'deleteUser',
            param: { id }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        service.AddUser = function (name, surname, address, zipcode, city, phone, email, password, callback) {
          const payload = {
            name: 'register',
            param: { name, surname, address, zipcode, city, phone, email, password }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        service.GetAllCustomers = function (callback) {

          const payload = {
            name: 'getAllCustomers',
            param: {  }
           };
          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });

        };

        service.AddCustomer = function (name, surname, func, social_reason, billing_address, delivery_address, zipcode, city, country, email, mobile_phone, fixed_phone, status, comment, created_date, callback ) {
          const payload = {
            name: 'addCustomer',
            param: { name, surname, func, social_reason, billing_address, delivery_address, zipcode, city, country, email, mobile_phone, fixed_phone, status, comment, created_date }
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
