'use strict';

angular.module('Dashboard')

.factory('DashboardService',
    ['$http', '$rootScope', '$window',
    function ($http, $rootScope, $window) {
        var service = {};

        service.GetAllGroups = function (callback) {

            const payload = {
              name: 'getAllGroups',
              param: {  }
            };
            $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
                .then(function (response) {
                  callback(response.data);
                }, function (error) {
                  console.log(error);
                });

        };

        service.AddGroup = function (name, callback) {
          const payload = {
            name: 'addGroup',
            param: { name }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        service.GetGroup = function (id, callback) {

          const payload = {
            name: 'getGroup',
            param: { id }
          };
          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });

        };

        service.UpdateGroup = function (id, name, callback) {
          const payload = {
            name: 'updateGroup',
            param: { id, name }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        service.DeleteGroup = function (id, callback) {
          const payload = {
            name: 'deleteGroup',
            param: { id }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

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

        service.UpdateUser = function (id, name, surname, address, zipcode, city, phone, email, group, callback) {
          const payload = {
            name: 'updateUser',
            param: { id, name, surname, address, zipcode, city, phone, email, group }
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

        service.AddUser = function (name, surname, address, zipcode, city, phone, email, password, group, callback) {
          const payload = {
            name: 'register',
            param: { name, surname, address, zipcode, city, phone, email, password, group }
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

        service.AddCustomer = function (name, surname, func, social_reason, billing_address, delivery_address, zipcode_billing, city_billing, country_billing, zipcode_delivery, city_delivery, country_delivery, email, mobile_phone, fixed_phone, status, comment, created_date, special_condition, callback ) {
          const payload = {
            name: 'addCustomer',
            param: { name, surname, func, social_reason, billing_address, delivery_address, zipcode_billing, city_billing, country_billing, zipcode_delivery, city_delivery, country_delivery, email, mobile_phone, fixed_phone, status, comment, created_date, special_condition }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        service.GetCustomer = function (id, callback) {

          const payload = {
            name: 'getCustomer',
            param: { id }
           };
          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });

        };

        service.UpdateCustomer = function (id, name, surname, func, social_reason, billing_address, delivery_address, zipcode_billing, city_billing, country_billing, zipcode_delivery, city_delivery, country_delivery, email, mobile_phone, fixed_phone, status, comment, created_date, special_condition, callback) {
          const payload = {
            name: 'updateCustomer',
            param: { id, name, surname, func, social_reason, billing_address, delivery_address, zipcode_billing, city_billing, country_billing, zipcode_delivery, city_delivery, country_delivery, email, mobile_phone, fixed_phone, status, comment, created_date, special_condition }
          }

          $http.post('http://ns3119735.ip-51-38-41.eu/cashier-api/', payload)
              .then(function (response) {
                callback(response.data);
              }, function (error) {
                console.log(error);
              });
        };

        service.DeleteCustomer = function (id, callback) {
          const payload = {
            name: 'deleteCustomer',
            param: { id }
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
