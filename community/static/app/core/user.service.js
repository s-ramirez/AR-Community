(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {
    var currentUser = null;

    function getCurrentUser() {
      return $http.get('/api/user/1').then(function (response) {
        if(response) {
          currentUser = response.data;
          return currentUser;
        } else {
          return currentUser;
        }
      });
    }

    function getAllUsers() {
      return $http.get('/api/user/').then(function (response) {
        if(response) {
          var temp = response.data.objects;
          var users = [];
          for(var i = 0; i < temp.length; i++) {
            if (temp[i].id != currentUser.id)
              users.push(temp[i]);
          }
          return users;
        } else {
          return [];
        }
      });
    }

    return {
      getCurrentUser: getCurrentUser,
      getAllUsers: getAllUsers
    }
  }
})();
