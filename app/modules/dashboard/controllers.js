'use strict';

angular.module('Dashboard')

.controller('DashboardController',
  ['$rootScope', '$scope', '$window', '$state', 'AuthenticationService', 'DashboardService', '$stateParams', '$timeout',
  function ($rootScope, $scope, $window, $state, AuthenticationService, DashboardService, $stateParams, $timeout) {

    $('.sidebar-menu').tree();

    if ($rootScope.globals.currentUser) {
      $scope.currentUserGroup = $rootScope.globals.currentUser.group;
    }

    $scope.users = [];

    DashboardService.GetAllUsers(function(response) {
      if (response.response) {
        const { users, groups } = response.response.result;
        if (users) {
          $scope.users = users;
        }
        if (groups) {
          $scope.groups = groups;
          const groupsHash = {};
          groups.forEach(group => {
            groupsHash[group.id] = group;
          })
          $scope.groupsHash = groupsHash;
        }
      }

      $timeout(function () {
        $('#users-table').DataTable({
          language: {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            },
            "select": {
                    "rows": {
                        _: "%d lignes séléctionnées",
                        0: "Aucune ligne séléctionnée",
                        1: "1 ligne séléctionnée"
                    }
            }
          },
          "bDestroy": true,
          "ordering": false
        });
      }, 500);
    });

    $scope.logout = function () {
      AuthenticationService.ClearCredentials();
      $state.go('login');
    }

    const globals = JSON.parse($window.localStorage.getItem('globals')) || {}
    if (globals.currentUser) {
      $scope.name = globals.currentUser.name;
      $scope.surname = globals.currentUser.surname;
      $scope.email = globals.currentUser.email;
    }
  }])

.controller('UserEditController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {
    if ($stateParams.id) {
      DashboardService.GetUser($stateParams.id, function(response) {
        if (response.response) {
          const { user } = response.response.result;
          if (user) {
            $scope.detailUser = user;
            $scope.detailUser.password = '';
            if (user.group) {
              $scope.detailUser.group = $scope.groupsHash[user.group];
            }
          }

        }
      });
    }

    $scope.updateUser = function () {
      $scope.dataLoading = true;
      const group = $scope.detailUser.group ? $scope.detailUser.group.id : null;
      DashboardService.UpdateUser(
        $scope.detailUser.id, $scope.detailUser.name, $scope.detailUser.surname, $scope.detailUser.address, $scope.detailUser.zipcode,
        $scope.detailUser.city, $scope.detailUser.phone, $scope.detailUser.email, group, $scope.detailUser.password, function(response) {
        if(!response.error) {
            $state.go('dashboard.users');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('AddUserController',
  ['$scope', '$window', '$state', 'DashboardService',
  function ($scope, $window, $state, DashboardService) {
    $scope.newUser = {};
    $scope.addUser = function () {
      $scope.dataLoading = true;
      const group = $scope.newUser.group ? $scope.newUser.group.id : null;
      DashboardService.AddUser(
        $scope.newUser.name, $scope.newUser.surname, $scope.newUser.address, $scope.newUser.zipcode,
        $scope.newUser.city, $scope.newUser.phone, $scope.newUser.email, $scope.newUser.password, group, function(response) {
        if(!response.error) {
            $state.go('dashboard.users');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('UserDeleteController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {
    if ($stateParams.id) {
      DashboardService.DeleteUser($stateParams.id, function(response) {
        if (response.response) {
          if(!response.error) {
            $state.go('dashboard.users');
          } else {
              $scope.error = response.error.message;
              $scope.dataLoading = false;
          }
        }
      });
    }

  }])

  .controller('GroupsController',
  ['$scope', '$window', '$state', 'DashboardService', '$timeout',
  function ($scope, $window, $state, DashboardService, $timeout) {
    $scope.groups = [];

    DashboardService.GetAllGroups(function(response) {
      if (response.response) {
        const { groups } = response.response.result;
        if (groups) {
          $scope.groups = groups;
        }
      }

    });

  }])

.controller('AddGroupController',
  ['$scope', '$window', '$state', 'DashboardService',
  function ($scope, $window, $state, DashboardService) {
    $scope.newGroup = {};

    $scope.addGroup = function () {
      $scope.dataLoading = true;
      DashboardService.AddGroup($scope.newGroup.name, function(response) {
        if(!response.error) {
            $state.go('dashboard.groups');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('GroupEditController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {

    if ($stateParams.id) {
      DashboardService.GetGroup($stateParams.id, function(response) {
        if (response.response) {
          const { group } = response.response.result;
          if (group) {
            $scope.detailGroup = group;
          }
        }
      });
    }

    $scope.updateGroup = function () {
      $scope.dataLoading = true;
      DashboardService.UpdateGroup($scope.detailGroup.id, $scope.detailGroup.name, function(response) {
        if(!response.error) {
            $state.go('dashboard.groups');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('GroupDeleteController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {
    if ($stateParams.id) {
      DashboardService.DeleteGroup($stateParams.id, function(response) {
        if (response.response) {
          if(!response.error) {
            $state.go('dashboard.groups');
          } else {
              $scope.error = response.error.message;
              $scope.dataLoading = false;
          }
        }
      });
    }

  }])

.controller('CustomersController',
  ['$scope', '$window', '$state', 'DashboardService', '$timeout',
  function ($scope, $window, $state, DashboardService, $timeout) {
    $scope.customers = [];

    DashboardService.GetAllCustomers(function(response) {
      if (response.response) {
        const { customers } = response.response.result;
        if (customers) {
          $scope.customers = customers;
        }
      }

      $timeout(function () {
        $('#customers-table').DataTable({
          language: {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            },
            "select": {
                    "rows": {
                        _: "%d lignes séléctionnées",
                        0: "Aucune ligne séléctionnée",
                        1: "1 ligne séléctionnée"
                    }
            }
          },
          "bDestroy": true,
          "ordering": false
        });
      }, 500);
    });

  }])

.controller('AddCustomerController',
  ['$scope', '$window', '$state', 'DashboardService',
  function ($scope, $window, $state, DashboardService) {
    $scope.newCustomer = {};
    $scope.newCustomer.created_date = moment().format('DD/MM/YYYY');

    $scope.addCustomer = function () {
      $scope.dataLoading = true;
      DashboardService.AddCustomer(
        $scope.newCustomer.name, $scope.newCustomer.surname, $scope.newCustomer.func, $scope.newCustomer.social_reason, $scope.newCustomer.billing_address,
        $scope.newCustomer.delivery_address, $scope.newCustomer.zipcode_billing, $scope.newCustomer.city_billing, $scope.newCustomer.country_billing, $scope.newCustomer.zipcode_delivery, $scope.newCustomer.city_delivery, $scope.newCustomer.country_delivery, $scope.newCustomer.email,
        $scope.newCustomer.mobile_phone, $scope.newCustomer.fixed_phone, $scope.newCustomer.status, $scope.newCustomer.comment, $scope.newCustomer.created_date, $scope.newCustomer.special_condition, function(response) {
        if(!response.error) {
            $state.go('dashboard.customers');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('CustomerEditController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {

    if ($stateParams.id) {
      DashboardService.GetCustomer($stateParams.id, function(response) {
        if (response.response) {
          const { customer } = response.response.result;
          if (customer) {
            $scope.detailCustomer = customer;
            $scope.detailCustomer.created_date = moment(customer.created_date).format('DD/MM/YYYY');
          }
        }
      });
    }

    $scope.updateCustomer = function () {
      $scope.dataLoading = true;
      DashboardService.UpdateCustomer(
        $scope.detailCustomer.id, $scope.detailCustomer.name, $scope.detailCustomer.surname, $scope.detailCustomer.func, $scope.detailCustomer.social_reason, $scope.detailCustomer.billing_address,
        $scope.detailCustomer.delivery_address, $scope.detailCustomer.zipcode_billing, $scope.detailCustomer.city_billing, $scope.detailCustomer.country_billing, $scope.detailCustomer.zipcode_delivery, $scope.detailCustomer.city_delivery, $scope.detailCustomer.country_delivery, $scope.detailCustomer.email,
        $scope.detailCustomer.mobile_phone, $scope.detailCustomer.fixed_phone, $scope.detailCustomer.status, $scope.detailCustomer.comment, $scope.detailCustomer.created_date, $scope.detailCustomer.special_condition, function(response) {
        if(!response.error) {
            $state.go('dashboard.customers');
        } else {
            $scope.error = response.error.message;
            $scope.dataLoading = false;
        }
      });
    }

  }])

.controller('CustomerDeleteController',
  ['$scope', '$window', '$state', 'DashboardService', '$stateParams',
  function ($scope, $window, $state, DashboardService, $stateParams) {
    if ($stateParams.id) {
      DashboardService.DeleteCustomer($stateParams.id, function(response) {
        if (response.response) {
          if(!response.error) {
            $state.go('dashboard.customers');
          } else {
              $scope.error = response.error.message;
              $scope.dataLoading = false;
          }
        }
      });
    }

  }]);
