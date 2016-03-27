(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {
    var currentUser = {};

    function getCurrentUser() {
      return $http.get('/api/user/1', function (user) {
        if(user) {
          return user;
        } else {
          return null;
        }
      });
    }

    function getAllUsers() {
      return [];
    }

    return {
      getCurrentUser: getCurrentUser,
      getAllUsers: getAllUsers
    }
  }
})();
